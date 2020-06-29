"""
All JSON schemas are registered in a __init__.py file such as this so that they can be imported by the api description files.
"""

import json
import os

script_dir = os.path.dirname(__file__)

with open(os.path.join(script_dir, 'cpuStatsGETresponse.json'), 'r') as f:
    cpuStatsGETresponse = json.load(f)


with open(os.path.join(script_dir, 'devicesUsbGETresponse.json'), 'r') as f:
    devicesUsbGETresponse = json.load(f)


with open(os.path.join(script_dir, 'diskStatsGETresponse.json'), 'r') as f:
    diskStatsGETresponse = json.load(f)

    
with open(os.path.join(script_dir, 'memoryStatsGETresponse.json'), 'r') as f:
    memoryStatsGETresponse = json.load(f)
