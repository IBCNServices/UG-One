"""
This file contains most of the documentation of what each applications/* endpoint does.
- Implements the JSON-schema's for validation
- Provides descriptions for each endpoint
- Implements the call for each endpoint to its relevant *_composer.py file
"""
__author__ = 'Martijn Gevaert'

from flask import request
from flask_restx import Namespace, Resource, fields
from json_schemas import applications_schemas, generic_schemas
import logging

from .applications_composer import ApplicationsComposer

applicationsComposer = ApplicationsComposer()

ns = Namespace(
    'applications', 
    description='Resources related to application management',
    validate=True
)


successANYresponse_schema = ns.schema_model(
    "successANYresponse", generic_schemas.successANYresponse)
containersGETresponse_schema = ns.schema_model(
    "containersGETresponse", applications_schemas.containersGETresponse)
containersPOST_schema = ns.schema_model(
    "containersPOST", applications_schemas.containersPOST)
@ns.route("/containers")
class Containers(Resource):

    @ns.response(200, 'Success', containersGETresponse_schema)
    @ns.doc(description='Returns a list with data for each container on the system')
    def get(self):
        return applicationsComposer.containers_GET()

    @ns.doc(description='Used to run a container, the system will try to pull the image from the repo if not locally available, \
        this call can take a long time to complete. Additional parameters are passed to client.container.remove(**kwargs). \
        Memory swap is disabled on all containers and all containers run detached')
    @ns.expect(containersPOST_schema)
    @ns.response(200, 'Success', successANYresponse_schema)
    def post(self):
        return applicationsComposer.containers_POST(request.get_json())


containersContainerDELETE_schema = ns.schema_model(
    "containersContainerDELETE", applications_schemas.containersContainerDELETE)
@ns.route("/containers/<string:name>")
class Container(Resource):

    @ns.doc(description='Deletes a container, additional parameters are passed to client.container.remove(**kwargs)')
    @ns.expect(containersContainerDELETE_schema)
    @ns.response(200, 'Success', successANYresponse_schema)
    def delete(self, name):
        return applicationsComposer.containersContainer_DELETE(
            body=request.get_json(), 
            name=name)


containersRunningStatsGETresponse_schema = ns.schema_model(
    "containersRunningStatsGETresponse", applications_schemas.containersRunningStatsGETresponse)
@ns.route("/containers/running/stats")
class ContainersStats(Resource):

    @ns.doc(description="Returns some stats about the running containers")
    @ns.response(200, 'Success', containersRunningStatsGETresponse_schema)
    def get(self):
        return applicationsComposer.containersRunningStats_GET()


containersRestartedContainerPUT_schema = ns.schema_model(
    "containersRestartedContainerPUT_schema", applications_schemas.containersRestartedContainerPUT)
@ns.route("/containers/restarted/<string:name>")
class ContainersContainerRestarted(Resource):

    @ns.doc(description='Used to restart a container')
    @ns.expect(containersRestartedContainerPUT_schema)
    @ns.response(200, 'Success', successANYresponse_schema)
    def put(self, name):
        body = request.get_json()
        # TODO: At this time, default values in the json-schemas need to be added to request bodies if missing.
        # A functionallity should be implemented that adds these values automatically based on the JSON schemas.
        # Not only for this function but others as well.
        if "timeout" not in body:
            body["timeout"] = 10
        return applicationsComposer.containersRestartContainer_PUT(body, name)


containersStoppedContainerPUT_schema = ns.schema_model(
    "containersStoppedContainerPUT", applications_schemas.containersStoppedContainerPUT)
@ns.route("/containers/stopped/<string:name>")
class ContainersContainerStopped(Resource):

    @ns.doc(description='Only used to stop containers at this time')
    @ns.expect(containersStoppedContainerPUT_schema)
    @ns.response(404, 'Not found')
    @ns.response(200, 'Success', successANYresponse_schema)
    def put(self, name):
        body = request.get_json()
        # adding default values as defined in the relevant JSON-schema
        if "timeout" not in body:
            body["timeout"] = 10
        return applicationsComposer.containersStoppedContainer_PUT(body, name)


imagesGETresponse_schema = ns.schema_model(
    "imagesGETresponse", applications_schemas.imagesGETresponse)
@ns.route("/images")
class Images(Resource):

    @ns.doc(description='Returns the images locally available on the drone')
    @ns.response(200, 'Success', imagesGETresponse_schema)
    def get(self):
        return applicationsComposer.images_GET()


imagesImageDELETE_schema = ns.schema_model(
    "imagesImageDELETE", applications_schemas.imagesImageDELETE)
@ns.route("/images/<string:identifier>")
class ImagesImage(Resource):

    @ns.doc(description='Deletes an image from the system')
    @ns.expect(imagesImageDELETE_schema)
    @ns.response(200, 'Success', successANYresponse_schema)
    def delete(self, identifier):
        return applicationsComposer.imagesImage_DELETE(request.get_json(), identifier=identifier)


@ns.route("/unused-objects")
class SystemUnused_objects(Resource):

    @ns.doc(description='Deletes unused docker objects by performing a docker system prune equivalent cleanup')
    @ns.response(200, 'Success', successANYresponse_schema)
    def delete(self):
        return applicationsComposer.unused_objects_DELETE()
