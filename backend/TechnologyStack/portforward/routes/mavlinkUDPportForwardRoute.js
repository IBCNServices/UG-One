const express = require('express');
const router = express.Router();
const { initPortForwardUDPMavlinkMessagesDroneClient, initPortForwardUDPMavlinkMessagesClientDrone, stopForwardUDPMavlinkMessages } = require('../controllers/mavlinkudpPortForwardController');

router
    .route('/init/drone_to_client') // open MAVLinkPort
    .post(initPortForwardUDPMavlinkMessagesDroneClient);

router
    .route('/init/client_to_drone') // open ClientPort
    .post(initPortForwardUDPMavlinkMessagesClientDrone)

router
    .route('/stop') // close MAVLinkPort and ClientPort
    .post(stopForwardUDPMavlinkMessages);


module.exports = router;