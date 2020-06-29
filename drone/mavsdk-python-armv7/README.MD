# MAVSDK-Python

This image should be used as the base image for any application that uses MAVSDK to communicate/control an autopilot present on a Ug-One drone.

## Building the image

This image has a long build time, it is recommended to build it without the --squash option first to prevent preserve progress upon failure.

build the image using:

```language=bash
docker image build -t gitlab.ilabt.imec.be:4567/jfmoeyer/mp2020ug-one/mavsdk-python-armv7:latest .
```

On the second run, rerun the command above but add the --squash option.

The resulting image should be placed inside a docker image repository so that it does not need to be rebuild for every drone.
