"""
Sits between the API description and how this is handled in the core
Composes responses and calls core functionallity
"""

from core import systemManager
from flask import jsonify

# exceptions
from exceptions import exceptions
import docker.errors

class ApplicationsComposer():

    def success_message(self):
        response = jsonify(
            message="Success",
            status_code=200
            )
        response.status_code = 200
        return response
    

    def containers_GET(self):
        response = jsonify(
            containers = systemManager.cleaned_container_list(),
            status_code = 200
        )
        response.status_code = 200
        return response


    def containers_POST(self, body):
        try:
            container = systemManager.run_image(**body)
        except TypeError as e:
            raise exceptions.TypeError(e)
        except exceptions.InsufficientResourcesError as e:
            raise e
        except docker.errors.APIError as e:
            raise exceptions.DockerError(e)
        except Exception as e:
            raise e
        return self.success_message()
        # TODO: implement a clearer error message when gunicorn times out


    def containersContainer_DELETE(self, body, name):
        try:
            systemManager.remove_container_by_name(
                name=name, 
                **body
            )
        except TypeError as e:
            raise exceptions.TypeError(e)
        except docker.errors.NotFound as e:  #Actually catches all docker.errors errors
            raise exceptions.DockerError(e)
        except Exception as e:
            raise e
        return self.success_message()


    def containersRunningStats_GET(self):
        response = jsonify(
            data=systemManager.running_container_stats_list(),
            status_code=200
        )
        response.status_code = 200
        return response


    def containersRestartContainer_PUT(self, body, name):
        try:
            systemManager.restart_container_by_name(
                name=name,
                **body)
        except TypeError as e:
            raise exceptions.TypeError(e)
        return self.success_message()


    def containersStoppedContainer_PUT(self, body, name):
        try:
            systemManager.stop_container_by_name(
                name=name, 
                **body)
        except TypeError as e:
            raise exceptions.TypeError(e)
        return self.success_message()


    def images_GET(self):
        cleaned_local_images_list = systemManager.cleaned_local_image_list()
        response = jsonify(
            images=cleaned_local_images_list,
            status_code=200
            )
        response.status_code = 200
        return response


    def imagesImage_DELETE(self, body, identifier):
        try:
            systemManager.delete_image(identifier=identifier, **body)
        except TypeError as e:
            raise exceptions.TypeError(e)
        except Exception as e:
            raise exceptions.DockerError(e)
        return self.success_message() 


    def unused_objects_DELETE(self):
        try:
            systemManager.system_prune()
        except Exception as e:
            raise exceptions.DockerError(e)
        return self.success_message()
