const dgram = require('dgram');
const yaml = require('js-yaml');
const fs = require('fs');


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

console.log("IP address for the UDP Port Forward Server is: " + ipAddress)

// @desc    request to open up two udp ports, one MAVLinkPort and one ClientPort. Forward the data from MAVLinkPort to client ip ClientPort and forward the data from 
//          ClientPort on UDP Port Forward Server to IP address drone MAVLinkPort
// @route   POST /api/v1/mavlink_udp_forward/init/drone_to_client
// @access  Public
exports.initPortForwardUDPMavlinkMessagesDroneClient = async (req, res, next) => {
    
    try {
            ///////////////////// drone to client //////////////////////////

        const { ipDrone, portMavlink, ipUser, portUser  } = req.body;

        // create UDP Socket to listen to incoming udp packets
        const UDPSocket = dgram.createSocket('udp4');

        // event, if websocket receives a message
        UDPSocket.on('message', (msg, rinfo) => {

            // if message equals stopUDPport then close websocket udp port
            const message = msg.toString()
  
            // if the message comes from the UDP Port Forward Server 
            // and specific word closes the udp port (this can be improved)
            if(rinfo.address.localeCompare(req.connection.remoteAddress.substr(7)) && message.localeCompare('stopUDPport') == 0){ 
                console.log('Closing the UDP socket from drone to client')
                UDPSocket.close()
            }
            else{

                // send data to the clients ip
                const client = dgram.createSocket("udp4");
                client.send(msg, 0, msg.length, portUser, ipUser, function(err) {

                    client.close(); // iedere maal deze poort sluiten?
                })
            }

        });
        
        // event, websocket starts listening
        UDPSocket.on('listening', () => {
            const address = UDPSocket.address();
            console.log(`server listening ${address.address}:${address.port}`);
        });

        // event, websocket is closing 
        UDPSocket.on('close', () =>{
            console.log(`port ${portMavlink} is closing`)
        });

        // event, there is an error occuring in the websocket
        UDPSocket.on('error', (err) => {
            console.log(`server error:\n${err.stack}`);
            UDPSocket.close();
          });
        
        // create a websocket with the received configuration data
        UDPSocket.bind({
            address: "0.0.0.0",
            port: portMavlink,
            exclusive: false // port is exclusive, not sharing with any other
        }, function() { 
                console.log("listening on port %d", portMavlink);
                // notify that binding is complete
                return res.status(201).json({
                    success: true,
                    data: null,
                    message:"Succeeded to create a UDP port for mavlink messages."
                })

            });


     
    } catch (error) {
        console.log("Server error, failed to create a UDP port forward mavlink messages link.")
        return res.status(500).json({
            success: false,
            message: "Server error, failed to create a UDP port forward mavlink messages link.",
            data: error
        })
    }
}

// @desc    request to forward a udp port.
// @route   POST /api/v1/mavlink_udp_forward/init
// @access  Public
exports.initPortForwardUDPMavlinkMessagesClientDrone = async (req, res, next) => {
    
    try {
        const { ipDrone, portMavlink, ipUser, portUser  } = req.body;

    ///////////////////// client back to drone //////////////////////////
    // create UDP Socket to listen to incoming udp packets
    const UDPSocketClientToDrone = dgram.createSocket('udp4');

    // event, if websocket receives a message
    UDPSocketClientToDrone.on('message', (msg, rinfo) => {

        console.log(`server got from ${rinfo.address}:${rinfo.port}: ${msg}`);

        const message = msg.toString()


            // if the message comes from the UDP Port Forward Server 
            // and specific word closes the udp port (this can be improved)        
        if(rinfo.address.localeCompare(req.connection.remoteAddress.substr(7)) && message.localeCompare('stopUDPport') == 0){ 
            console.log('Closing the UDP socket client to drone')
            UDPSocketClientToDrone.close()
        }
        else{

            // send data further to drones ip
            const drone = dgram.createSocket("udp4");
            drone.send(msg, 0, msg.length, portMavlink, ipDrone, function(err) {
                drone.close(); 
            })
        }

    });
    
    // event, websocket starts listening
    UDPSocketClientToDrone.on('listening', () => {
        const address = UDPSocketClientToDrone.address();
        console.log(`server listening ${address.address}:${address.port}`);
    });

    // event, websocket is closing 
    UDPSocketClientToDrone.on('close', () =>{
        console.log(`port ${portUser} is closing`)
    });

    // event, there is an error occuring in the websocket
    UDPSocketClientToDrone.on('error', (err) => {
        console.log(`server error:\n${err.stack}`);
        UDPSocketClientToDrone.close();
      });
    
    // create a websocket with the received configuration data
    UDPSocketClientToDrone.bind({
        address: "0.0.0.0",
        port: portUser,
        exclusive: false // port is exclusive, not sharing with any other
    }, function() { 
            console.log("listening on port %d", portUser);
            return res.status(201).json({
                success: true,
                data: null,
                message:"Succeeded to create an UDP port for mavlink messages."
            })

        });
     
    } catch (error) {
        console.log("Server error, failed to create a UDP port forward mavlink messages link.")
        return res.status(500).json({
            success: false,
            message: "Server error, failed to create a UDP port forward mavlink messages link.",
            data: error
        })
    }
}



// @desc    stop the udp ports (MAVLinkPort and ClientPort) with forwarding the messages.
// @route   POST /api/v1/mavlink_udp_forward/stop
// @access  Public
exports.stopForwardUDPMavlinkMessages = async (req, res, next) => {
    
    try {
        const {  portMavlink, portUser, IPbackendAPI } = req.body;
        
        // only the backend API can send a stop message to the udp port, 
        // first check if the message is from the backend API

        
        if(IPbackendAPI.substr(7).localeCompare(ipAddress.substr(7)) == 0 )
        {

            // create two sockets. the first socket will close the MAVLinkPort and the second socket will close the ClientPort
            const serverCloseUDP1 = dgram.createSocket("udp4");
            const serverCloseUDP2 = dgram.createSocket("udp4");
    
            const message = Buffer.from('stopUDPport')

            // close MAVLinkPort
            serverCloseUDP1.send(message, 0, message.length, portMavlink, ipAddress, function(err) {
                serverCloseUDP1.close(); 
                console.log('UDP Port is closing')
    
            })

            // close ClientPort
            serverCloseUDP2.send(message, 0, message.length, portUser, ipAddress, function(err) {
                serverCloseUDP2.close(); 
                console.log('UDP Port is closing')
    
            })
    
            return res.status(200).json({
                success: true,
                data: null,
                message:"Succeeded to close an UDP port."
            })
        }
        else{
            return res.status(404).json({
                success: false,
                data: null,
                message:"failed to close an UDP port."
            })
        }
        
     

    } catch (error) {
        console.log("Server error, failed to close an UDP port.")
        return res.status(500).json({
            success: false,
            message: "Server error, failed to close an UDP port.",
            data: error
        })
    }
}
