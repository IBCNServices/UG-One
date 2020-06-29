"""
This file contains most of the documentation of what each system/* endpoint does.
- Implements the JSON-schema's for validation
- Provides descriptions for each endpoint
- Implements the call for each endpoint to its relevant * _composer.py file
"""
__author__ = 'Martijn Gevaert'

from flask_restx import Namespace, Resource, fields
from json_schemas import system_schemas

from .system_composer import SystemComposer

systemComposer = SystemComposer()

ns = Namespace(
    'system', 
    description='Resources related to general system management and drone communication',
    validate=True
    )


cpuStatsGETresponse_schema = ns.schema_model(
    "cpuStatsGETresponse", system_schemas.cpuStatsGETresponse)
@ns.route("/cpu/stats")
class cpuUsage(Resource):

    @ns.doc(description="Returns multiple statistics related to CPU usage")
    @ns.response(200, "Success", cpuStatsGETresponse_schema)
    def get(self):
        return systemComposer.cpu_stats_GET()


diskStatsGETresponse_schema = ns.schema_model(
    "diskStatsGETresponse", system_schemas.diskStatsGETresponse)
@ns.route("/disk/stats")
class Disk(Resource):

    @ns.doc(description='Gets some statistics about the disk and disk_space')
    @ns.response(200, "Success", diskStatsGETresponse_schema)
    def get(self):
        return systemComposer.disk_stats_GET()


memoryStatsGETresponse_schema = ns.schema_model(
    "memoryStatsGETresponse", system_schemas.memoryStatsGETresponse)
@ns.doc(description='Relates to available memory and how this memory is managed')
@ns.route("/memory/stats")
class Memory(Resource):

    @ns.doc(description='gets memory statistics.')
    @ns.response(200, "Success", memoryStatsGETresponse_schema)
    def get(self):
        return systemComposer.memory_stats_GET()


devicesUsbGETresponse_schema = ns.schema_model(
    "devicesUsbGETresponse", system_schemas.devicesUsbGETresponse)
@ns.route("/devices/usb")
class DeviceVideo(Resource):

    @ns.doc(description='Retrieves usb devices connected to the onboard drone computer')
    @ns.response(200, "Success", devicesUsbGETresponse_schema)
    def get(self):
        return systemComposer.devices_usb_GET()
