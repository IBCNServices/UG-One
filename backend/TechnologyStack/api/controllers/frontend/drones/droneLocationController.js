const axios = require('axios');
const yaml = require('js-yaml');
const fs = require('fs');


const MavlinkPortAvailable = require('../../../models/modelsMongoDB/mavlinkPortsAvailableModel');
const infoDrones = require('../../../models/modelsMongoDB/DroneinfoModel');


let config = {};
try {
    config = yaml.safeLoad(fs.readFileSync('./config/config.yml', 'utf8'));

} catch (error) {
    console.log('error reading the yaml file.')
    console.log(error);
}

//network configurations
// to use global variables 
ipAddress = null

// to test it locally, set the variable STAGINGVW to true in the config file
// to test it on the virtual wall, set the variable STAGINGVW to false in the config file

if (config.STAGINGVW === true)
    {
        ipAddress = config.IPVW    // virtual wall
    }
else
    {
        ipAddress = config.IPLOCAL // local 
    }

console.log("Chosen IP address for the backend api is: " + ipAddress)


// @desc    Configure mavlink and QGC, send a start signal to the udp port forward server
// @route   POST /api/v1/drone/:id/location/start
// @access  Public
exports.configureAndStartMavlinkQGC = async (req, res, next) => {
    
    try {
        
        const { ipUser } = req.body
        const idDrone = req.params.id

        // check if idDrone exist in the database
        const droneExist = await infoDrones.findOne({_id: idDrone},'_id')

        if (droneExist === null){
            //drone doesn't exist
            return res.status(400).json({
                success: false,
                message: "Drone with given id does not exist in the system. Please add the drone to the system.",
                data: null
            })
        }


        // check if the drone and backend are connected
        const droneConnectedToServer = await MavlinkPortAvailable.findOne({idDrone: idDrone}, 'drone_serverConnected')


        // if the drone hasn't registered for a mavlinkPort, send droneserverconnected as false and udpportopen als false back
        if (droneConnectedToServer === null ){
            return res.status(200).json({
                success: false,
                data: {DroneServerConnected: false,
                        UDPportOpen: false},
                message: "Drone is not registered on the server for a mavlinkport.",
            })
        } //  drone is registered but not connected to the server. send droneserverconnect and udpportopen als false back
        else if(droneConnectedToServer.drone_serverConnected === false){
            return res.status(200).json({
                success: false,
                data:{ DroneServerConnected: false,
                        UDPportOpen: false},
                message: "Drone is registered on the server and has a mavlinkport but he is not connected to the server."
            })
        }
        else if(droneConnectedToServer.drone_serverConnected === true){
            // drone is registered and connected to the server
            // post request to forward server to create an udp socket on a specific port
            
            const updateDoc = {
                ipUser,
                server_clientConnected: true
            }
    
            // update the document of the mavlinkport connection with client_serverconnection true and the ip of the user in ipUser 
            const updateDocumentMavlinkPortAvailable = await MavlinkPortAvailable.findOneAndUpdate({idDrone: idDrone}, updateDoc)

            const setupDataUDPPortForward = {
                ipUser,
                portUser: updateDocumentMavlinkPortAvailable.portUser,
                ipDrone: updateDocumentMavlinkPortAvailable.ipDrone,
                portMavlink: updateDocumentMavlinkPortAvailable.portMavlink,
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            // send the post request to the UDP port forward server to open udp sockets on the server and start forwarding the udp messages from the server to the clients device
            axios.post(ipAddress + ':7500/api/v1/mavlink_udp_forward/init/drone_to_client',
                setupDataUDPPortForward, config)
                .then( function (response) {
                    console.log('Success: UDP Port Opened')
                    
                })
                .catch(function (error) {
                    console.log('error: failed to open UDP Port')
                    return res.status(200).json({
                        success: false,
                        data: { DroneServerConnected: true,
                                UDPportOpen: false},
                        message: "Server didn't succeed to open an UDP Port for the drone."
                    })
                })
            
            // send the post request to the UDP port forward server to open udp sockets on the server and start forwarding the udp messages from the clients device to the drone
            axios.post(ipAddress + ':7500/api/v1/mavlink_udp_forward/init/client_to_drone',
                setupDataUDPPortForward, config)
                .then( function (response) {
                    console.log('Success: UDP Port Opened')

                })
                .catch(function (error) {
                    console.log('error: failed to open UDP Port')
                    return res.status(200).json({
                        success: false,
                        data: { DroneServerConnected: true,
                                UDPportOpen: false},
                        message: "Server didn't succeed to open an UDP Port for the drone."
                    })
                })

            return res.status(200).json({
                success: true,
                data: {  DroneServerConnected: true,
                            UDPportOpen: true ,
                            portUser: updateDocumentMavlinkPortAvailable.portUser},
                message: "Successfully opened the UDP PORT."
            })


        }
        else{
            return res.status(400).json({
                success: false,
                message: 'Drone not registered for a mavlinkport',
                data: null
            })
        }


    } catch (error) {
        console.log("Did not succeed to configure and start Mavlink QGC, server error.")
        return res.status(500).json({
            success: false,
            message: "Did not succeed to configure and start Mavlink QGC, server error.",
            data: error
        })
    }
}




// @desc    stop the udp port from listening on the UDP port forward server
// @route   POST /api/v1/drone/:id/location/stop
// @access  Public
exports.stopMavlinkQGC = async (req, res, next) => {
    
    try {
        
        const idDrone = req.params.id;
        // retrieve the information as the mavlinkport, clientport from the database
        const docInfoMavlinkCommunication = await MavlinkPortAvailable.findOne({idDrone: idDrone})


        // if the drone is registered on the server and his messages are being forwarded, then the UDP sockets can be closed to stop the forwarding

        // drone is not registered
        if(docInfoMavlinkCommunication === null)
        {
            return res.status(200).json({
                success: false,
                message: "Drone does not have an udp port assigned to him.",
                data: null
            })
        }
        // drone is not forwarding his messages
        else if(docInfoMavlinkCommunication.server_clientConnected === false)
        {
            return res.status(200).json({
                success: false,
                message: "User has not started QGC",
                data: null
            })
        }
        else
        {
            // drone is forwarding his messages
            const stopDataUDPPortForward = {
                portMavlink: docInfoMavlinkCommunication.portMavlink,
                portUser: docInfoMavlinkCommunication.portUser,
                IPbackendAPI: ipAddress
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            // a POST request is send to the udp port forward server to close the client and MAVLink UDP sockets.
            axios.post(ipAddress + ':7500/api/v1/mavlink_udp_forward/stop',
            stopDataUDPPortForward, config)
                .then( async function (response) {

                    if(response.data.success === true){

                        const updateCloseConnectionDoc = {
                            ipUser: "",
                            server_clientConnected: false
                        }

                        const updateCloseConnectionDocumentMavlinkPortAvailable = await MavlinkPortAvailable.findOneAndUpdate({idDrone: idDrone}, updateCloseConnectionDoc)
                        
                        return res.status(200).json({
                            success: true,
                            data: {UDPportClosed: true},
                            message: "Succes, closed the UDP port."
                        })
                        
                    }
                    else{
                        return res.status(200).json({
                            success: false,
                            data: {UDPportClosed: false},
                            message: "Did not succeed to close the UDP Port."
                        })
                    }



                    
                })
                .catch(function (error) {

                    return res.status(200).json({
                        success: false,
                        data: {UDPportClosed: false},
                        message: "error, didn't succeed to close the udp socket"
                    })
                })





        }



    } catch (error) {
        console.log("server error, failed to close the UDP port.")
        return res.status(500).json({
            success: false,
            message: "server error, failed to close the UDP port.",
            data: error
        })
    }
}


// @desc    get the MAVLinkPort and ClientPort from the database
// @route   GET /drone/:id/location/ports
// @access  Public
exports.getDroneMAVLinkAndClientPort = async (req, res, next) => {
    
    try {

        await MavlinkPortAvailable.findOne({idDrone: req.params.id})
            .then(function(message){
                console.log(message)
                if(message.data === null)
                {
                    return res.status(200).json({
                        success: true,
                        data: null,
                        message: "Drone did not ask for a MAVLinkPort yet, first send a POST request from the drone to the path '/api/v1/:id/mavlinkport on the back-end API. :id should be replaced by the id of the drone."
                    })   
                }
                else{
                    return res.status(200).json({
                        success: true,
                        data: message,
                        message: "MAVLinkPort and ClientPort from the database."
                    })   
                }  
            })
            .catch(function(error) {
                return res.status(400).json({
                    success: false,
                    data: error.response.data,
                    message: "Did not succeed to retrieve the MAVLinkPort and ClientPort from the database"
                })     
            })


    } catch (error) {
        console.log("Failed to get the MAVLinkPort and ClientPort from the database, server error!")

        return res.status(500).json({
            success: false,
            data: error,
            message: "Failed to get the MAVLinkPort and ClientPort from the database, server error!"
        })
    }
}