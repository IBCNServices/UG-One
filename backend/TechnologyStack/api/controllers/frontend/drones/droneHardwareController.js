// all the hardware of the drone methods to interact with the database

const infoDrones = require('../../../models/modelsMongoDB/DroneinfoModel')


// @desc    get the hardware from the specific drone
// @route   GET /drone/:id/hardware
// @access  Public
exports.getDroneHardware = async (req, res, next) => {
    
    try {

        // retrieve the hardware of a specific drone from the database
        const HardwareSpecificDrone = await infoDrones.findById({_id: req.params.id },'hardwareDrone');

        if (HardwareSpecificDrone === null){
            // no hardware found
            return res.status(400).json({
                success: false,
                data: null,
                message: "Not the correct parameters were send."
            })

        }
        else{
            // hardware found
            return res.status(200).json({
                success: true,
                message: "Successfully retrieved the hardware from the drone from the server",
                data: HardwareSpecificDrone
            })
        }

    } catch (error) {
        console.log("Failed to get the hardware from the drone, server error!")

        return res.status(500).json({
            success: false,
            data: error,
            message: "Failed to get the hardware from the drone, server error!"
        })
    }
}


// @desc    add the hardware of the drone !!!NOT IN USE!!!!
// @route   POST /drones/:id/hardware
// @access  Public
addDroneHardware = async (req, res, next) => {
    try {
        // add new hardware of the drone to the database
        const droneHardware = await DroneinfoHardware.create(req.body);

        return res.status(201).json({
            success: true,
            data: droneHardware,
            message: "Hardware added to the database."
        })


    } catch (error) {
        console.log("Failed to add the hardware to the database, server error!")

        return res.status(500).json({
            success: false,
            data: error,
            message: "Failed to add the hardware to the database, server error!"
        })
    }
}

