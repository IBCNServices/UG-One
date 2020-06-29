"""
All JSON schemas are registered in a __init__.py file such as this so that they can be imported by the api description files.
"""

import json
import os

script_dir = os.path.dirname(__file__)

with open(os.path.join(script_dir, 'containersGETresponse.json'), 'r') as f:
    containersGETresponse = json.load(f)
with open(os.path.join(script_dir,'containersPOST.json'),'r') as f:
    containersPOST = json.load(f)

with open(os.path.join(script_dir, 'containersContainerDELETE.json'), 'r') as f:
    containersContainerDELETE = json.load(f)

with open(os.path.join(script_dir, 'containersStoppedContainerPUT.json'), 'r') as f:
    containersStoppedContainerPUT = json.load(f)

with open(os.path.join(script_dir, 'containersRestartedContainerPUT.json'), 'r') as f:
    containersRestartedContainerPUT = json.load(f)

with open(os.path.join(script_dir, 'containersRunningStatsGETresponse.json'), 'r') as f:
    containersRunningStatsGETresponse = json.load(f)

with open(os.path.join(script_dir, 'imagesImageDELETE.json'), 'r') as f:
    imagesImageDELETE = json.load(f)
with open(os.path.join(script_dir, 'imagesGETresponse.json'), 'r') as f:
    imagesGETresponse = json.load(f)
