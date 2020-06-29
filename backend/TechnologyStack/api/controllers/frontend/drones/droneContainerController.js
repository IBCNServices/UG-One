const axios = require('axios');


const infoDrones = require('../../../models/modelsMongoDB/DroneinfoModel')


// @desc    Get all the containers from the drone
// @route   GET /api/v1/drone/:id/containers
// @access  Public
exports.getInfoAllContainersFromDrone = async (req, res, next) => {
    
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

        // GET request to retrieve all the active and stopped containers from the drone
        await axios.get(ipAddressDrone+':14500/applications/containers')
            .then(function(message){

                const infoAllContainers = message
                var returnBasicInfoContainers = {
                    containers: []
                }
        
                // transform the retrieved container data to the right format
                for (var containerNumber = 0; containerNumber < infoAllContainers.data.containers.length; containerNumber++)
                {
                    returnBasicInfoContainers.containers.push(
                        {
                        idContainer: infoAllContainers.data.containers[containerNumber].container_id,
                        name: infoAllContainers.data.containers[containerNumber].names[0],
                        created: new Date(infoAllContainers.data.containers[containerNumber].created*1000).toString().substr(0,34), // substring is used because otherwise +0000 is added after the data
                        image: infoAllContainers.data.containers[containerNumber].image,
                        status: infoAllContainers.data.containers[containerNumber].status
                    })
                }
        
        
                return res.status(200).json({
                    success: true,
                    data: returnBasicInfoContainers,
                    message: "Info all containers retrieved."
                })        
            })
            .catch(function(error){

                return res.status(400).json({
                    success: false,
                    data: error.response.data,
                    message: "Did not succeed to get all the containers from the drone."
                })    
            })


        


    } catch (error) {

        console.log("Server error, get all containers from drone.")
        return res.status(500).json({
            success: false,
            message: "Server error, get all containers from drone failed.",
            data: error
        })
    }
}

// @desc    Get info of a specific container on drone
// @route   GET /api/v1/drone/:id/containers/:idContainer
// @access  Public
exports.getInfoSpecificContainerFromDrone = async (req, res, next) => {
    
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

        const { idContainer} = req.params

        // GET Request to the drone to retrieve extra information of a drone
        await axios.get(ipAddressDrone+':14500/applications/containers')
        .then(function(message){

            const infoAllContainers = message

            // filter all the containers to retrieve the desired container information
            var infoSpecificContainer = infoAllContainers.data.containers.filter(container => container.container_id === idContainer)[0] // it's an array with only one element

            infoSpecificContainer['created'] = new Date(infoSpecificContainer.created*1000).toString().substr(0,34);

            return res.status(200).json({
                success: true,
                data: infoSpecificContainer,
                message: "Retrieved info from a specific container."
            })               
        })
        .catch(function(error){

            return res.status(400).json({
                success: false,
                data: error.resonse.data,
                message: "Did not succeed to get al the containers from the drone."
            })    
        })

    } catch (error) {

        console.log("Server error, get specific container from drone.")
        return res.status(500).json({
            success: false,
            message: "Server error, get specific container from drone failed.",
            data: error
        })
    }
}

// @desc    Post the information to the drone that is needed to create a container on the drone
// @route   POST /api/v1/drone/:id/containers/create
// @access  Public
exports.createNewContainerOnDrone = async (req, res, next) => {
    
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

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const infoCreateContainerData = req.body

        // transform the data to the right format
        infoCreateContainerData['name'] = infoCreateContainerData['nameContainer'];
        infoCreateContainerData['image'] = infoCreateContainerData['nameImage'];
        infoCreateContainerData['reserved_mem'] = infoCreateContainerData['reservedMemory'];
        infoCreateContainerData['cpu_shares'] = infoCreateContainerData['cpuShares'];
        infoCreateContainerData['overwrite_existing'] = infoCreateContainerData['overwriteExisting'];
        infoCreateContainerData['auto_remove'] = infoCreateContainerData['autoRemove'];
        delete infoCreateContainerData['nameContainer'];
        delete infoCreateContainerData['nameImage'];
        delete infoCreateContainerData['reservedMemory'];
        delete infoCreateContainerData['cpuShares'];
        delete infoCreateContainerData['overwriteExisting'];
        delete infoCreateContainerData['autoRemove'];

        // send the POST request to deploy a Docker container on the drone.
        await axios.post(ipAddressDrone+":14500/applications/containers", infoCreateContainerData, config)
            .then(function(message){

                return res.status(201).json({
                    success: true,
                    data: null,
                    message: "Container: "+ infoCreateContainerData.name  +" successfully created on the drone."
                })     
            })
            .catch(function(error){
                return res.status(400).json({
                    success: true,
                    data: error.response.data,
                    message: error.response.data.message
                })  
            })


      
    } catch (error) {

        console.log("Server error, create container on drone.")
        return res.status(500).json({
            success: false,
            message: "Server error, create container on drone failed.",
            data: error
        })
    }
}

// @desc    stop a container on the drone
// @route   POST /api/v1/drone/:id/containers/stop
// @access  Public
exports.stopContainerOnDrone = async (req, res, next) => {
    
    try {

        var ipAddressDrone = undefined

        // get the IP address of the drone from the database 
        await infoDrones.findOne({_id: req.params.id}, "ipDrone")
            .then(function(message){
                ipAddressDrone = "http://"+message.ipDrone
            })
            .catch(function(error){
                console.log("could not retrieve the ip of the drone")
                return res.status(400).json({
                    success: false,
                    data: error,
                    message: "could not retrieve the ip of the drone."
                }) 
            })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // retrieve the data from the body
        const { nameStoppedContainer } = req.body
        var infoStopContainerData = req.body
        delete infoStopContainerData['nameStoppedContainer']
        infoStopContainerData['timeout'] = infoStopContainerData['timeOut']
        delete infoStopContainerData['timeOut']

        // send a put request to stop a container on the drone
        await axios.put(ipAddressDrone+":14500/applications/containers/stopped/" + nameStoppedContainer, infoStopContainerData, config)
            .then(function(message){
                return res.status(200).json({
                    success: true,
                    data: null,
                    message: "Container: " + nameStoppedContainer +" stopped on the drone"
                    })
            })
            .catch(function(error){
                return res.status(400).json({
                    success: true,
                    data: error.response.data,
                    message: error.response.data.message
                    })
            })



    } catch (error) {

        console.log("Server error, stop container on drone.")
        return res.status(500).json({
            success: false,
            message: "Server error, stop container on drone failed.",
            data: error
        })
    }
}

// @desc    delete a container on the drone
// @route   POST /api/v1/drone/:id/containers/remove
// @access  Public
exports.deleteContainerOnDrone = async (req, res, next) => {
    
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

        var { nameDeleteContainer } = req.body
        var infoDeleteContainerData = req.body
        delete infoDeleteContainerData['nameDeleteContainer']

        // Send a delete request to the drone to delete a container of the drone
        nameDeleteContainer = nameDeleteContainer.substring(1) // remove the / in front of the name
        await axios.delete(ipAddressDrone+":14500/applications/containers/" + nameDeleteContainer, {data: infoDeleteContainerData})
            .then(function(message) {
                return res.status(200).json({
                    success: true,
                    data: null,
                    message: "Container: " + nameDeleteContainer + " successfully deleted from the drone."
                })     
            })
            .catch(function(error) {
                return res.status(400).json({
                    success: false,
                    data: error.response.data,
                    message: error.response.data.message
                })     
            })
  


    } catch (error) {

        console.log("Server error, remove container from drone.")
        return res.status(500).json({
            success: false,
            message: "Server error, remove container from drone failed.",
            data: error
        })
    }
}

// @desc    restart a container on the drone
// @route   POST /api/v1/drone/:id/containers/restart
// @access  Public
exports.restartContainerOnDrone = async (req, res, next) => {
    
    try{

        var ipAddressDrone = undefined
        // get the IP address of the drone from the database. 
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

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        var { nameRestartContainer } = req.body
        nameRestartContainer = nameRestartContainer.substring(1) // remove the / in front of the name

        var infoRestartContainerData = req.body
        delete infoRestartContainerData['nameRestartContainer']
        infoRestartContainerData['timeout'] = infoRestartContainerData['timeOut']
        delete infoRestartContainerData['timeOut']

        // Send a PUT request to the drone to restart a container
        await axios.put(ipAddressDrone+":14500/applications/containers/restarted/" + nameRestartContainer, infoRestartContainerData, config)
            .then(function(message) {
                return res.status(200).json({
                    success: true,
                    data: null,
                    message: "Container: " + nameRestartContainer + " successfully restarted on the drone."
                })     
            })
            .catch(function(error) {
                return res.status(400).json({
                    success: false,
                    data: error.response.data,
                    message: error.response.data.message
                })     
            })
        }
  


     catch (error) {

        console.log("Server error, restart container on drone.")
        return res.status(500).json({
            success: false,
            message: "Server error, restart container on drone failed.",
            data: error
        })
    }
}

// @desc    docker system prune on the drone
// @route   POST /api/v1/drone/:id/containers/restart
// @access  Public
exports.dockerSystemPruneOnDrone = async (req, res, next) => {
    
    try {

        var ipAddressDrone = undefined
        
        // retrieve the IP address of the drone from the database
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


        // send a delete request to the drone to delete a docker container
        await axios.delete(ipAddressDrone+":14500/applications/unused-objects")
            .then(function(message) {
                return res.status(200).json({
                    success: true,
                    data: null,
                    message: "Docker system prune succeeded on the drone."
                })     
            })
            .catch(function(error) {
                return res.status(400).json({
                    success: false,
                    data: error.response.data,
                    message: error.response.data.message
                })     
            })


    } catch (error) {

        console.log("Server error, docker system prune on drone.")
        return res.status(500).json({
            success: false,
            message: "Server error, docker system prune on drone failed.",
            data: error
        })
    }
}