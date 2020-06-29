var uuid4 = require('uuid-random'); 

const MavlinkPortAvailable = require('../models/modelsMongoDB/mavlinkPortsAvailableModel'); // model used to send and retrieve data from the database

const checkMavlinkPortsExist = async () => {
    try{
        
        // update the document of the mavlinkport connection with client_serverconnection true and the ip of the user in ipUser 
        const mavlinkPortsExistInDatabase = await MavlinkPortAvailable.find() // retrieve all the MAVLinkPorts from the database

        if (mavlinkPortsExistInDatabase.length !== 100){
            console.log("Mavlink ports collection does not have 100 documents in the database.")
            
            // if the collection still exists in the database but does not have 100 documents, then the collection will be dropped
            if(mavlinkPortsExistInDatabase.length !== 0)
            {
                await MavlinkPortAvailable.collection.drop(); // drops the collection 
            }
            // adds the correct number of ports in the database
            for (let port = 14550; port < 14650; port++){
                const clientport = port + 1000
                const add = {
                    _id: uuid4(),
                    drone_serverConnected: false,
                    server_clientConnected: false,
                    idDrone: "",
                    ipDrone: "",
                    portMavlink: port,
                    ipUser: "",
                    portUser: clientport
                }
            
                await MavlinkPortAvailable.create(add)
                    .then(function (message) {
                        console.log("Mavlink Port" + port +"created ")
                    })
            }
        }
        else{
        console.log("the "+ mavlinkPortsExistInDatabase.length +" MAVLInk ports exist in the database")
        }
    }
    catch(error){
        throw error
    }
   
}
 

module.exports = checkMavlinkPortsExist;
 

