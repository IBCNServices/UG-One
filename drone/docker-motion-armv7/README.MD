# Motion video streaming

Motion is a surveillance camera project.
Within this folder it is implemented inside a Docker container so that it can be ran on Ug-One drones.

Starting this container through the Ug-One API can be done using the command body:

```language=json
{
    "image": "<repositoryname>:docker-motion-armv7:latest",
    "reserved_mem": 256,
    "overwrite_existing": true,
    "name": "motion-video-stream",
    "ports": {
        "8080":"8080/udp",
        "8081":"8081/tcp"
    },
    "devices": [
        "/dev/video0:/dev/video0"
    ],
    "volumes": {
        "/motion-files":{"bind": "/motion-files", "mode": "rw"}
    }
}
```

This assumes that a webcam is connected to /dev/video0 on the host.

Now that the streaming server is running, it is possible to access video streaming data through the urls:

```http://[IPv6_address]:8081/0/stream```

and

```http://[IPv6_address]:8081/0/substream```

## Recording video

### Starting recordings

This is done by starting an event through the GUI found under the URL:
```http://[IPv6_address]:8080```

### Retrieving recordings

the easiest way to get to a drone’s recordings requires access to the drone’s host. These files are stored within the containers file system under /motion-files, so users can either mount this volume to a folder on the host, or get access to these files by copying them using the docker cp command, e.g.:

```bash
docker cp frosty_kirch:/motion-files ./
```
