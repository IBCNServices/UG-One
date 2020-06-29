const express = require('express');
const router = express.Router();
const { getDroneHardware  } = require('../../controllers/frontend/drones/droneHardwareController');
const { getDroneResources  } = require('../../controllers/frontend/drones/droneResourcesController');
const { configureAndStartMavlinkQGC, stopMavlinkQGC, getDroneMAVLinkAndClientPort } = require('../../controllers/frontend/drones/droneLocationController')
const { getInfoAllContainersFromDrone, createNewContainerOnDrone, stopContainerOnDrone, deleteContainerOnDrone,
     restartContainerOnDrone, dockerSystemPruneOnDrone, getInfoSpecificContainerFromDrone } = require('../../controllers/frontend/drones/droneContainerController')
const { getInfoAllImagesFromDrone, deleteImageOnDrone, getInfoSpecificImageFromDrone } = require('../../controllers/frontend/drones/droneImageController')
const { checkIfDroneIsActive } = require('../../controllers/frontend/drones/droneActiveController')

///////////// INFO HARDWARE UDP PORT FORWARD SERVER ////////////////
router // get the hardware from the specific drone
    .route('/:id/hardware')
    .get(getDroneHardware)

router // get the resources
    .route('/:id/resources')
    .get(getDroneResources)

router // create on the udp port forward server a udp socket to listen to udp messages
    .route('/:id/location/start')
    .post(configureAndStartMavlinkQGC)

router // close the udp socket on the port forward server
    .route('/:id/location/stop')
    .post(stopMavlinkQGC)

router // close the udp socket on the port forward server
    .route('/:id/location/ports')
    .get(getDroneMAVLinkAndClientPort)   

///////////// CHECK IF DRONE IS ACTIVE OR NOT ////////////////::
router
    .route('/:id/active')
    .get(checkIfDroneIsActive)


//////// CONTAINERS ON DRONE ///////////////
router // get all containers from the drone
    .route('/:id/containers')
    .get(getInfoAllContainersFromDrone)

router // get all containers from the drone
    .route('/:id/containers/:idContainer')
    .get(getInfoSpecificContainerFromDrone)

router // create a container on the drone
    .route('/:id/containers/create')
    .post(createNewContainerOnDrone)

router // stop a container on the drone
    .route('/:id/containers/stop')
    .post(stopContainerOnDrone)

router // delete a container on the drone
    .route('/:id/containers/remove')
    .post(deleteContainerOnDrone)

router // restart the container on the drone
    .route('/:id/containers/restart')
    .post(restartContainerOnDrone)

router // docker system prune on drone
    .route('/:id/docker-unused-objects/prune')
    .post(dockerSystemPruneOnDrone)



//////////////// IMAGES ON DRONE /////////////
router // get all images from the drone
    .route('/:id/images')
    .get(getInfoAllImagesFromDrone)

router // get specific image from the drone
    .route('/:id/images/:idImage')
    .get(getInfoSpecificImageFromDrone)

router // delete an image on the drone
    .route('/:id/images/remove')
    .post(deleteImageOnDrone)

module.exports = router;