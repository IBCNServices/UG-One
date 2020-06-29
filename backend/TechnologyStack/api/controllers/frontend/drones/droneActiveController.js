// check if the drone is active
const axios = require('axios');

const infoDrones = require('../../../models/modelsMongoDB/DroneinfoModel')


// @desc    Check if drone is active or not
// @route   GET /drones/:id/active
// @access  Public
exports.checkIfDroneIsActive = async (req, res, next) => {
    
    try {

        var ipAddressDrone = undefined        
        
        // retrieve the ip of the drone from the database
        await infoDrones.findOne({_id: req.params.id}, "ipDrone")
            .then(function(message){
                ipAddressDrone = "http://"+message.ipDrone
            })
            .catch(function(error){
                return res.status(400).json({
                    success: false,
                    data: error,
                    message: "could not retrieve the ip of the drone."
                }) 
            })

        // send a ping get request to see if the drone is active or not
        await axios.get(ipAddressDrone+':14500/ping')
            .then(function(message){


                return res.status(200).json({
                    success: true,
                    data: message.data,
                    message: "Connection established with the drone."
                }) 
        
        
      
            })
            .catch(function(error){

                return res.status(400).json({
                    success: false,
                    data: error.response.data,
                    message: "Can not establish a connection to the drone."
                })    
            })


    } catch (error) {
        console.log("Server error, did not succeed to check if the drone is active or not.")
        return res.status(500).json({
            success: false,
            message: "Server error, did not succeed to check if the drone is active or not.",
            data: error
        })
    }
}