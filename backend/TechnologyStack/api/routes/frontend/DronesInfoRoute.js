const express = require('express');
const router = express.Router();
const { getNameAllDrones, addInfoNewDrone, deleteDroneFromDatabase, nameDroneExist} = require('../../controllers/frontend/drones/droneInfoController');

router
    .route('/')
    .get(getNameAllDrones)
    //.post(addInfoNewDrone);
    
router
    .route('/') // needed to add this redundant path otherwise the post api wouldn't come in the swagger document
    .post(addInfoNewDrone);

router
    .route('/:id')
    .delete(deleteDroneFromDatabase)

router
    .route('/:nameDrone')
    .get(nameDroneExist)


module.exports = router;