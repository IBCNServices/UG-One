"""
Contains a single Ping endpoint which is used for sanity checks and demonstrating how a simple endpoint should be implemented.

This file contains most of the documentation of what the ping endpoint does.
- Implements the JSON-schema's for validation
- Provides descriptions for each endpoint
- Implements the call for each endpoint to its relevant *_composer.py file
"""
__author__ = 'Martijn Gevaert'

from flask_restx import Namespace, Resource, fields
from json_schemas import base_schemas

from .ping_composer import PingComposer

pingComposer = PingComposer()

ns = Namespace('ping', 
    description='Provides a simple ping, usefull during development',
    validate=True)


pingGETresponse_schema = ns.schema_model(
    "pingGETresponse", base_schemas.pingGETresponse)
@ns.route("/")
class MainClass(Resource):

    @ns.doc(description='Returns a ping message')
    @ns.response(200, 'Succes', pingGETresponse_schema)
    def get(self):
        return pingComposer.GET()
