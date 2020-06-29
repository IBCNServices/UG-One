"""
Currently contains all of the logic of the Ug-One API.
Methods in this file are called by the *_composer.py files which are in turn called by the api description files.
"""

import docker
from exceptions import exceptions
from flask import jsonify
import logging
import os
import psutil
import re
import requests
import subprocess
import sys
import yaml

class SystemManager():

    def __init__(self):
        self.init_config(relative_config_path="../../config.yml")
        self.init_docker()
        if self.config["mavlink"].get("disable_mavlink", False) is False:
            self.init_mavlink()

        logging.info('SystemManager initialized')


    """Loads the config.yml file"""
    def init_config(self, relative_config_path):
        current_dir = os.path.dirname(__file__)
        abs_config_path = os.path.join(current_dir, relative_config_path)
        with open(abs_config_path, 'r') as file:
            # The FullLoader parameter handles the conversion from YAML
            # scalar values to Python dictionary format
            self.config = yaml.load(file, Loader=yaml.FullLoader)
        return


    """
    Initiates the Docker client and logs in to a Docker image repository using 
    the credentials/deployment keys provided in the docker_credentials.yml file.
    """
    def init_docker(self):
        logging.info('Initializing docker client...')
        try:
            self.docker_client = docker.from_env()
        except Exception:
            logging.critical(
                'An error with the docker client occurred, exiting...')
            sys.exit(1)
        
        current_dir = os.path.dirname(__file__)
        abs_config_path = os.path.join(current_dir, "../../docker_credentials.yml")
        credentials = {}
        with open(abs_config_path, 'r') as file:
            credentials = yaml.load(file, Loader=yaml.FullLoader)
        try:
            self.docker_client.login(
                username=credentials["username"], 
                password=credentials["password"],
                registry=credentials["registry"])
        except Exception as e :
            logging.critical( 'Could not log in, exiting...', e.explanation )
            sys.exit(1)


    """
    Initiatiates the MAVLink communication pipeline by:
    - Requesting a MAVLink port on the backend (unless turned off in the configuration file)
    - Starting up the MAVLink Router with all the desired endpoints:
        - The endpoint on the backend
        - 10 endpoints on the drone itself,
        - Any custom endpoint provided in the configuration file
      The MAVLink Router Docker image used for this is also configured in the configuration file.
    """
    def init_mavlink(self):
        endpoints = []

        backend_config = self.config["ug-one_backend"]
        if backend_config["enable_backend_connection"] is True:
            response = requests.post(os.path.join(
                    "http://",
                    backend_config["IPv4_address"]+":" + str(backend_config["mavlink_setup_port"]),
                    "api/v1",
                    backend_config["drone_uuid"],
                    "mavlinkport"
                )
            )
            r_body_content = response.json()
            if(response.status_code!=200):
                logging.critical("Could not retrieve endpoint from backend, exiting ...", response.reason, response.text)
                sys.exit(1)
            
            self.backend_mavlink_port = r_body_content["data"]
            endpoints.append(
                (backend_config["IPv4_address"],self.backend_mavlink_port)
            )

        # Adding 10 endpoints on the drone for local mavlink control
        for i in range(14550, 14560): 
            endpoints.append(("127.0.0.1", i))

        # Adding the custom endpoints defined by the user
        custom_endpoints = self.config["mavlink"].get("custom_endpoints", []) # this is an OPTIONAL setting
        if custom_endpoints is not None:  # In case custom_endpoints is an empty list
            for endpoint in custom_endpoints: 
                endpoints.append(endpoint)

        # building the command to be passed to the MAVLink-router container
        startup_command = "mavlink-routerd"
        startup_command += " --tcp-port 0" # Disables TCP listening
        for endpoint in endpoints:
            startup_command += " -e " + endpoint[0] + ":" + str(endpoint[1])
        # the serial device comes at the end
        startup_command += " /dev/serial0:" + str(self.config["mavlink"]["baudrate"])
        self.run_image(
            image=self.config["system"]["mavlink_router_image_name"],
            reserved_mem=64,
            cpu_shares=262144,
            overwrite_existing=True,
            auto_remove=False,
            devices=[self.config["mavlink"]["serial_device"]+":/dev/serial0"],
            network_mode="host",
            restart_policy={"Name": "on-failure"},
            command=startup_command,
            name="MAVLink_Router")


    def restart_container_by_name(self, name, **kwargs):
        container_list = self.docker_client.containers.list(
            filters={"name": name},
            all=True
        )
        if len(container_list) == 0:
            raise exceptions.GenericError("Could not find running container with name: "+ name, 404)
        container_list[0].restart(**kwargs)
        return


    def stop_container_by_name(self, name, **kwargs):
        # first need to find the container, the following commands only returns the container if it's running
        container_list = self.docker_client.containers.list(
            filters={"name":name}
        )
        if len(container_list) == 0:
            raise exceptions.GenericError("Could not find running container with name: "+ name, 404)
        container_list[0].stop(**kwargs)      


    def remove_container_by_name(self, name, timeout=10, **kwargs):
        # first need to find the container
        container_list = self.docker_client.containers.list(
            filters={"name": name},
            all=True  # all containers, running and other
        )
        if len(container_list) == 0:
            raise exceptions.GenericError("Could not find container, name: "+ name, 404)
        container_list[0].remove(**kwargs)


    def insufficient_resources(self, reserved_mem, container_list):
        # Currently only checking memory (RAM) availability
        insufficient_resources = []
        mem_stats = self.memory_stats_by_container_list(container_list)
        if mem_stats["mem_available"] < reserved_mem:
            insufficient_resources.append(str(reserved_mem - mem_stats["mem_available"])+ "MB memory")
        
        if len(insufficient_resources) != 0:
            logging.warn(
                "Tried to start container with insufficient resource:",insufficient_resources)
            return insufficient_resources
        return None


    def run_image(self, image, reserved_mem=128, cpu_shares=1024, overwrite_existing=False, auto_remove=True, **kwargs):
        if overwrite_existing is True:
            container_list = self.docker_client.containers.list(all=True)
            # Gets the first container with the same name, container names are unique so this is ok
            container = next((container for container in container_list if container.name==kwargs["name"]), None)
            if container is not None:
                # checking if there will be enough resources after this container is gone.
                container_list_after_removal = [x for x in container_list if x != container]
                insufficient_resources = self.insufficient_resources(reserved_mem, container_list_after_removal)
                if insufficient_resources is not None:
                    raise exceptions.InsufficientResourcesError(
                        "After current container with provided name would be removed following resource(s) would still be insufficiently available", 
                        insufficient_resources=insufficient_resources
                    )

                # If container is autoremove, then there is no need to remove it after stopping
                auto_remove_container = container.attrs["HostConfig"].get('AutoRemove', False)
                # Stopping the container
                if container.status != "exited":
                    container.stop()
                # Check if container is still there, this is the second check against autoremoval
                try:    #placed inside a try block because sometimes this throws an exception, probably related to the container being removed mid-search
                    filtered_list = self.docker_client.containers.list(
                    all=True,
                    filters={"name":kwargs["name"]}
                    )
                except docker.errors.NotFound as e:
                    filtered_list = []
                if len(filtered_list) > 0 and auto_remove_container is False:
                    filtered_list[0].remove()

        container_list = self.docker_client.containers.list(all=True)
        insufficient_resources = self.insufficient_resources(reserved_mem, container_list)
        if insufficient_resources is not None:
            raise exceptions.InsufficientResourcesError(insufficient_resources=insufficient_resources)

        return self.docker_client.containers.run(
            auto_remove=auto_remove,
            cpu_shares=cpu_shares,
            detach=True,
            image=image,
            mem_limit=str(reserved_mem)+'m',
            memswap_limit=-1,  # disables memory swap
            privileged=False,
            **kwargs
            )


    def delete_image(self, identifier, **kwargs):
        self.docker_client.images.remove(image=identifier, **kwargs)


    """Just like the command Docker system prune"""
    def system_prune(self):
        self.docker_client.containers.prune()
        self.docker_client.images.prune()
        self.docker_client.networks.prune()
        self.docker_client.volumes.prune()


    def cleaned_local_image_list(self):
        cleaned_local_image_list = []

        for image in self.docker_client.images.list():
            image_w_tag_names = image.attrs["RepoTags"]
            tags = []
            image_name_no_tag = ""

            if len(image_w_tag_names) > 0:
                for repotag in image_w_tag_names:
                    # finds the string after the last ":" and appends it
                    tags.append(re.findall('([^:]+$)', repotag)[0])

                image_name_no_tag = image_w_tag_names[0][:-(len(tags[0])+1)]

            cleaned_local_image_list.append({
                "name": image_name_no_tag,
                "tags": tags,
                "image_id": image.id,
                "created": image.attrs["Created"],
                "size": image.attrs["Size"]
            })
        return cleaned_local_image_list


    def memory_stats_by_container_list(self, container_list):
        reserved_memory = self.config["system"]["reserved_host_memory"] * 1048576
        for container in container_list:
            if container.status != "exited":
                reserved_memory = reserved_memory + \
                    container.attrs['HostConfig']['Memory']

        svmem = psutil.virtual_memory()
        return {
            "mem_available": int((svmem.total - reserved_memory)/1048576),
            "mem_total": int(svmem.total/1048576)
        }


    def memory_stats(self):
        container_list = self.docker_client.containers.list(all=True)
        return self.memory_stats_by_container_list(container_list)


    def running_container_stats_list(self):
        container_list = self.docker_client.containers.list(filters={"status":"running"}, sparse=True)
        container_stats_list = []
        for i in range(0, len(container_list)):
            stats = container_list[i].stats(stream=False)
            container_stats_list.append({
                "name": stats["name"],
                "memory_current_usage": int(stats["memory_stats"]["usage"]/1048576),
                "memory_max_usage": int(stats["memory_stats"]["max_usage"]/1048576),
                "memory_limit": int(stats["memory_stats"]["limit"]/1048576)
            })
        return container_stats_list


    def cleaned_container_list(self):
        container_list = self.docker_client.containers.list(all=True, sparse=False)
        sparse_container_list = self.docker_client.containers.list(all=True, sparse=True)
        cleaned_container_list = []

        for i in range(0, len(container_list)):
            detailed_container = container_list[i]
            sparse_container = sparse_container_list[i]

            cleaned_container_list.append({
                "container_id": sparse_container.id,
                "image_id": sparse_container.attrs["ImageID"],
                "image": sparse_container.attrs["Image"],
                "created": sparse_container.attrs["Created"],
                "status": sparse_container.status,
                "ports": sparse_container.attrs["Ports"],
                "names": sparse_container.attrs["Names"],
                "memory_limit": int(detailed_container.attrs["HostConfig"]["Memory"]/1048576),
                "cpu_shares": detailed_container.attrs["HostConfig"]["CpuShares"]
            })
        return cleaned_container_list


    def disk_stats(self):
        disk_stats = psutil.disk_usage('/')
        return {
            "free" : int(disk_stats.free/1048576),
            "percent_used": disk_stats.percent,
            "total" : int(disk_stats.total/1048576),
            "used" : int(disk_stats.used/1048576)
        }


    def cpu_stats(self):
        load_average_percent = [round(x / psutil.cpu_count() * 100,2) for x in psutil.getloadavg()]
        cpu_stats = {
            "cpu_count": psutil.cpu_count(),
            "cpu_freq": self.object_with_field_to_dict(psutil.cpu_freq()),
            "cpu_load_avg_percent": {
                "1_min": load_average_percent[0],
                "5_min": load_average_percent[1],
                "15_min": load_average_percent[2]
            },
            "cpu_percent": psutil.cpu_percent(interval=1),
            "cpu_times": self.object_with_field_to_dict(psutil.cpu_times()),
            "cpu_times_percent": self.object_with_field_to_dict(psutil.cpu_times_percent())
        }
        return cpu_stats


    def object_with_field_to_dict(self, object_with_field):
        object_dict = {}
        for field in object_with_field._fields:
            object_dict[field] = getattr(object_with_field, field)
        return object_dict


    """
    Provides a list of the connected USB devices.
    When running inside a Debian container (such as the Ug-One API), this does not provide 
    descriptors for USB devices. This does work outside the container during testing, or
    inside Ubuntu containers.
    """
    def connected_usb_devices_list(self):
        device_re = re.compile(
            "Bus\s+(?P<bus>\d+)\s+Device\s+(?P<device>\d+).+ID\s(?P<id>\w+:\w+)\s(?P<tag>.+)$", re.I)
        df = subprocess.check_output("lsusb")
        df = df.decode("ascii")
        usb_devices = []
        for i in df.split("\n"):
            if i:
                info = device_re.match(i)
                if info:
                    dinfo = info.groupdict()
                    dinfo['device'] = '/dev/bus/usb/%s/%s' % (
                        dinfo.pop('bus'), dinfo.pop('device'))
                    usb_devices.append(dinfo)
        return usb_devices
