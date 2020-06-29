// all the hardware of the drone methods to interact with the database
var uuid4 = require('uuid-random');

const MavlinkPortAvailable = require('../../models/modelsMongoDB/mavlinkPortsAvailableModel')
const infoDrones = require('../../models/modelsMongoDB/DroneinfoModel')


// @desc    request a mavlink port for the drone
// @route   POST /:id/mavlinkport
// @access  Public
exports.getMavlinkAvailablePorts = async (req, res, next) => {
    
    try {
        const idDrone = req.params.id
        const ipDrone = req.connection.remoteAddress.substr(7) //get substring of ipDrone starting at the 8 character because the retrieved ip address is ::ffff:192.168.0.142

        // checks if the id and ip of the drone are not undefined
        if(idDrone === undefined || ipDrone === undefined)
        {
           console.log("ipDrone and idDrone undefined")
            

            return res.status(400).json({
                success: false,
                data: null,
                message: "Not the correct parameters were send."
            })
        }

        //check if there is already a connection established with the given id of the drone and if the drone is already registered
        // if not registered for a mavlink port but he is registered as a drone on the system, assign a port to that drone and fill in the ip address and the id drone in the Database with the assigned port
        // if there is no port available => send no ports available
        // if the drone has already a port assigned to him, update the ip of the drone
        const mavlinkDroneRegistered  = await MavlinkPortAvailable.findOne({idDrone: idDrone});
        const droneExist = await infoDrones.findOne({_id: idDrone})

        var sendMavlinkDronePort = null;

        if (droneExist !== null && mavlinkDroneRegistered === null){
            // idDrone not in the mavlink port database, idDrone will be assigned to a port and the information (ip, id) will be saved in the Database
            const updateDoc = {
                idDrone: idDrone,
                ipDrone: ipDrone,
                drone_serverConnected: true,

            }
            const mavlinkPort  = await MavlinkPortAvailable.findOneAndUpdate({drone_serverConnected: false}, updateDoc);
            await infoDrones.findOneAndUpdate({_id: idDrone}, {ipDrone})
                .then(function(message){
                    console.log('ip drone updated')
                })
                .catch(function (error){
                    console.log("ip drone failed to update.")
                    return res.status(400).json({
                        success: false,
                        data: null,
                        message: "Ip Drone not updated"
                    })
                })

            // no mavlink ports available anymore
            if (mavlinkPort === null){

                return res.status(200).json({
                    success: false,
                    data: null,
                    message: "No mavlinkPort available anymore for the drone!"
                })
            }
            else{
                //mavlink port available and send the port back to the drone
                sendMavlinkDronePort = mavlinkPort.portMavlink
            }

            return res.status(200).json({
                success: true,
                data: sendMavlinkDronePort,
                message: "succeeded to get a mavlink port"
            })


        }
        else if(droneExist !== null && mavlinkDroneRegistered !== null){
            // idDrone exists and the drone already fetched an id from the system, has already assigned a port to the drone
            // update the ip in the database with the correct assigned port
            const updateDoc = {
                ipDrone: ipDrone,
                statusConnection: true,
            }
            await infoDrones.findOneAndUpdate({_id: idDrone}, {ipDrone})
                .then(function(message){
                    console.log('ip drone updated')
                })
                .catch(function (error){
                    console.log("ip drone failed to update.")
                    return res.status(400).json({
                        success: false,
                        data: null,
                        message: "Ip Drone not updated"
                    })
                })

            const mavlinkPort  = await MavlinkPortAvailable.findOneAndUpdate({idDrone: idDrone}, updateDoc);
            sendMavlinkDronePort = mavlinkPort.portMavlink

            return res.status(200).json({
                success: true,
                data: sendMavlinkDronePort,
                message: "Mavlink port request succeeded."
            })

        }
        else{
            // id drone doesn't exist in the system
            return res.status(200).json({
                success: false,
                data: null,
                message: "id of the drone is not registered in the system, please register first!"
            })
        }


    } catch (error) {
        console.log("Retrieving the MAVLink port didn't succeed, Back-end API is not online, Server error!")

        return res.status(500).json({
            success: false,
            data: error,
            message: "Retrieving the MAVLink port didn't succeed, Back-end API is not online, Server error!"
        })
    }
}

