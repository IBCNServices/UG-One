"""
Sits between the API description and how this is handled in the core
Composes responses and calls core functionallity
"""

from flask import jsonify

class PingComposer():

    def GET(self):
        response = jsonify(
            message = "Ping response from the Ug-One_API, hello there!",
            status_code = 200
        )
        response.status_code = 200
        return response
