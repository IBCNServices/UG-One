# import logging

from flask_restx import Api
import logging
from .applications import ns as ns_applications
from .ping import ns as ns_ping
from .system import ns as ns_system

api = Api(
    version="0.1", 
    title="Ug-One_API",
    description="Used to manage application deployment on a Ug-One drone"
)

from exceptions import exceptions_registering

api.add_namespace(ns_applications, path='/applications')
api.add_namespace(ns_ping)
api.add_namespace(ns_system, path='/system')
