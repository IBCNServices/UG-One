# Ug-One_API

The Ug-One API has been tested and works on Raspberry Pi 4 and 3B.
It wil not work on RPi zero and other ARMv6 devices.

## Prerequisites

- When using an ARM onboard computer (e.g. Raspbery Pi), make sure it is ARMv7 or above. This means that devices such as the RPi3, RPi4 will work, but Raspberry Pi Zero (W) will not.

- A Docker image repository such as Git Hub or GitLab.

- The Ug-One API needs access to the mavlink-router image at startup to route MAVLink communication around. This is done by either making it available on the drone itself (git pull) or simply making sure it is available in the container repository which is will be connected to the drone.
If you do not have the mavlink-router image available, follow the instructions in "Building the MAVLink-Router image".

- Docker on the drone, install by following the official Docker documentation: <https://docs.docker.com/engine/install/>

- pip3 on the drone, run `apt-get install python3-pip` to install it.

## Installing the Ug-One API

Before following these instructions, read the prerequisites section above.

1. Pull the Ug-One_drone repository, or at least the Ug-One_drone/Ug-One_API folder

1. Go to /Ug-One_drone/Ug-One_API, in this directory:
    - Follow the instructions in the example_docker_credentials.yml file.
    - Modify the config.yml file according to the instructions within that file.

1. Go to the Ug-One_drone/Ug-One_API/deployment folder and run `sudo pip3 install -r requirements.txt`.

    1. Check that docker-compose has been installed succesfully by running `docker-compose version`. If not, it might be necessary to run `pip3 install docker-compose`.

1. OPTIONAL: pull the MAVLink Router image, this could take a while and will prevent the Ug-One API from timing out at startup. If not done, the API should pull it automatically.

1. Run `docker-compose up --build -d`, the Ug-One API will now boot on startup as well.

## Building the MAVLink-Router image

Pull the Ug-One drone repository, go to the MAVLink-Router folder and run:

```bash
docker image build -t <registry.example.com/group/project>/<imagename>:<tag> .
```

and push to the container repository that drones will be connected to. The name and tag of the MAVLink-Router need to be set in the config.yml file.

## Consulting the REST API documentation

A swagger-UI is hosted on <http://drone-ip:14500>

## Continuing development on the Ug-One API

In order to debug the Ug-One API outside of a Docker container, go to /Ug-One_API/Ug-One_API/
and run `pip3 install -r requirements.txt`
