"""
All JSON schemas are registered in a __init__.py file such as this so that they can be imported by the api description files.
"""

import json
import os

script_dir = os.path.dirname(__file__)

with open(os.path.join(script_dir, 'successANYresponse.json'), 'r') as f:
    successANYresponse = json.load(f)
