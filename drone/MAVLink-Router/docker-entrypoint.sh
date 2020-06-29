#!/bin/bash
# Only used when the appropriate options in the Dockerfile are set, 
# Using this file is not part of the normal Ug-One usage.

mavlink-routerd \
    -e 127.0.0.1:14550 \
    -e 127.0.0.1:14551 \
    -e 127.0.0.1:14552 \
    -e 127.0.0.1:14553 \
    -e 127.0.0.1:14555 \
    -e 127.0.0.1:14556 \
    -e 127.0.0.1:14557 \
    -e 127.0.0.1:14558 \
    -e 127.0.0.1:14559 \
    -e 192.168.1.20:14550 \ # PC ip, used for manual testing
    -e 10.2.0.212:14550 \ # Example backend ip
    /dev/serial0:921600 # Serial connection to mavlink flight-controller