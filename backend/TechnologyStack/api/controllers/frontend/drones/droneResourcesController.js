// all methods to get the resources of the drone.
const axios = require('axios');

const infoDrones = require('../../../models/modelsMongoDB/DroneinfoModel')

       
// @desc    get the resources from the drone
// @route   GET /drones/:id/resources
// @access  Public
exports.getDroneResources = async (req, res, next) => {
    
    try {
        

        var ipAddressDrone = undefined
        
        // get the IP address of the drone from the database
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

        var sendSystemDataOnDroneBack = {
            memoryOnDrone: undefined,
            diskStatsOnDrone: undefined,
            devicesConnectedOnDrone: undefined,
            memoryContainerUsageOnDrone: undefined,
            computationalLoad: undefined,
            connectivity: undefined
        }
        
        // send different Get requests to the drone and the database to retrieve the different resources
        // the resoures are the container memory usage, storage info, CPU info, memory info, ip address, connected devices to the drone and the USB hubs on the drone
        await axios.get(ipAddressDrone+':14500/applications/containers/running-containers/stats')
            .then(function(message){
                sendSystemDataOnDroneBack.memoryContainerUsageDrone = message.data.data[0]
            })
            .catch(function(error){
                sendSystemDataOnDroneBack.memoryContainerUsageDrone = null
            })

        await axios.get(ipAddressDrone+':14500/system/disk/stats')
            .then(function(message){
                sendSystemDataOnDroneBack.diskStatsOnDrone = message.data.disk_stats
            })
            .catch(function(error){
                sendSystemDataOnDroneBack.diskStatsOnDrone = null
            })

        await axios.get(ipAddressDrone+':14500/system/memory/stats')
            .then(function(message){
                sendSystemDataOnDroneBack.memoryOnDrone = message.data
            })
            .catch(function(error){
                sendSystemDataOnDroneBack.memoryOnDrone = null
            })

        await axios.get(ipAddressDrone+':14500/system/devices/usb')
            .then(function(message){
                sendSystemDataOnDroneBack.devicesConnectedOnDrone = message.data.devices
            })
            .catch(function(error){
                sendSystemDataOnDroneBack.devicesConnectedOnDrone = null
            })

        await axios.get(ipAddressDrone+':14500/system/cpu/stats')
            .then(function(message){
                sendSystemDataOnDroneBack.computationalLoad = message.data
            })
            .catch(function(error){
                sendSystemDataOnDroneBack.computationalLoad = null
            })

        await infoDrones.findOne({_id: req.params.id},'_id ipDrone')
            .then(function(message){
                sendSystemDataOnDroneBack.connectivity = {ipDrone: message.ipDrone}
            })
            .catch(function(error){
                sendSystemDataOnDroneBack.connectivity = null
            })


        return res.status(200).json({
            success: true,
            data: sendSystemDataOnDroneBack,
            message: "Successfully retrieved the info from the drone."
        })        


    } catch (error) {
        console.log("Failed to retrieve the resources from the drone.")
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve the resources from the drone.",
            data: error
        })
    }
}



