"""
This document registers the custom errors to the flask/flask-restx api
"""

from exceptions import exceptions
from flask import jsonify
from apis import api

@api.errorhandler(exceptions.DockerError)
@api.errorhandler(exceptions.GenericError)
@api.errorhandler(exceptions.InsufficientResourcesError)
@api.errorhandler(exceptions.TypeError)
def handle_error(error):
    return error.get_response()
