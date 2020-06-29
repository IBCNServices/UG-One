# MAVLink Router Docker container

## Installation

Build this image using:

```language=bash
docker image build -t <repository name>/mavlink-router:<tag> .
```

Make sure this image is available in the image repository connected to the drones.

This image should not be started manually, it is started up automatically by the Ug-One API at startup.
