const express = require('express');
const router = express.Router();
const { getMavlinkAvailablePorts } = require('../../controllers/api_drone/mavlinkPortsAvailableController');

// routes for the drone to retrieve the MAVLinkPort
router
    .route('/:id/mavlinkport')
    .post(getMavlinkAvailablePorts); 



module.exports = router;