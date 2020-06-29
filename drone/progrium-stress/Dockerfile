FROM ubuntu:bionic
MAINTAINER Jeff Lindsay <progrium@gmail.com>

RUN apt-get update && apt-get install -y stress

ENTRYPOINT ["/usr/bin/stress", "--verbose"]
CMD []

#Martijn Gevaert#
### Updated the ubuntu version from trusty to bionic ###
# This image is used to run stress tests to validate the resource management capabilities of the Ug-One drones.
