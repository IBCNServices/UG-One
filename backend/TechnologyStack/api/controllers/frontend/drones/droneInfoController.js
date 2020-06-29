// all the hardware of the drone methods to interact with the database
var uuid4 = require('uuid-random');

const infoDrones = require('../../../models/modelsMongoDB/DroneinfoModel')



// @desc    get all the name of all the drones
// @route   GET /drones
// @access  Public
exports.getNameAllDrones = async (req, res, next) => {
    
    try {
        // retrieve all names and information of the drones from the database
        const nameAllDrones = await infoDrones.find({},'_id nameDrone ipDrone');

        return res.status(200).json({
            success: true,
            message: "Retrieved all the drone names and IDs",
            data: nameAllDrones
        })
    } catch (error) {
        console.log("Server error, did not succeed to retrieve all the names of the drones.")
        return res.status(500).json({
            success: false,
            message: "Server error, did not succeed to retrieve all the names of the drones.",
            data: error
        })
    }
}


// @desc    add the new drone to the database
// @route   POST /drones
// @access  Public
exports.addInfoNewDrone = async (req, res, next) => {
    try {

        var bodyInfoDrone = req.body;

        bodyInfoDrone._id = uuid4();

        console.log(bodyInfoDrone)

        // create a new document for the newly created drone in the database
        await infoDrones.create(bodyInfoDrone)
        .then(function(message) {
            return res.status(201).json({
                success: true,
                data: message,
                message: "Succeeded to add a new drone to the database."
            })   
        })
        .catch(function(error) {
            return res.status(400).json({
                success: false,
                data: null,
                message: error.response.data.message
            })     
        })
    



    } catch (error) {
        console.log("Server error, did not succeed to add a drone to the database.")
        return res.status(500).json({
            success: false,
            message: 'Server error, did not succeed to add a drone to the database.',
            data: error
        })
    }
}


// @desc    delete a drone from the database
// @route   DELETE /drones/:id
// @access  Public
exports.deleteDroneFromDatabase = async (req, res, next) => {
    try {

        // check if the drone exist in database
        const deletedDrone = await infoDrones.findById(req.params.id);

        // drone does not exist
        if(!deletedDrone) {
            return res.status(404).json({
                success: false,
                message: 'The drone with the given id is not found',
                data: null
            })
        }

        // drone exists
        // remove the drone from the database
        await deletedDrone.remove();


        return res.status(200).json({
            success: true,
            data: {},
            message: "Drone successfully deleted from the server."
        })


    } catch (error) {
        console.log("Server error, did not succeed to delete the drone from the database.")
        return res.status(500).json({
            success: false,
            message: 'Server error, did not succeed to delete the drone from the database.',
            data: error
        })
    }
}

// @desc    does the name of a drone already exist
// @route   GET /drones/:nameDrone
// @access  Public
exports.nameDroneExist = async (req, res, next) => {
    
    try {

        // check if the name of the drone already exists in the database
        const nameExists = await infoDrones.findOne({nameDrone: req.params.nameDrone},'nameDrone');

        if( nameExists === null)
        {
            return res.status(200).json({
                success: true,
                data: false,
                message: "Name drone does not exist."
            })

        }
        else{

            return res.status(200).json({
                success: true,
                data: true,
                message: "Name drone exists"
            })
        }


    } catch (error) {
        console.log("Server error, failed to check if the drone name exists.")
        return res.status(500).json({
            success: false,
            message: 'Server error, failed to check if the drone name exists.',
            data: error
        })
    }
}

