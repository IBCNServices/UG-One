"""
Sits between the API description and how this is handled in the core,
Composes responses and calls core functionallity
"""

from core import systemManager
import psutil
from flask import jsonify

class SystemComposer():

    def not_implemented_response(self):
        response = jsonify(
            message = "Not implemented yet"
        )
        response.status_code = 501
        return response


    def cpu_stats_GET(self):
        cpu_stats = systemManager.cpu_stats()
        response = jsonify(
            cpu_stats=cpu_stats,
            status_code=200
        )
        response.status_code = 200
        return response


    def devices_usb_GET(self):
        device_list = systemManager.connected_usb_devices_list()
        response = jsonify(
            devices=device_list,
            status_code=200)
        response.status_code = 200
        return response


    def disk_stats_GET(self):
        response = jsonify(
            disk_stats=systemManager.disk_stats(),
            status_code=200)
        response.status_code=200
        return response


    def GET(self):
        return self.not_implemented_response()


    def memory_stats_GET(self):
        mem_stats = systemManager.memory_stats()
        response = jsonify(mem_stats)
        response.status_code = 200
        return response
