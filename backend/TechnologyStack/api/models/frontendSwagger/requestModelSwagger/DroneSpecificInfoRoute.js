const Joi = require('@hapi/joi')


module.exports = {
    0: {
        model: "getDroneHardware", // Name of the model
        group: "Hardware", // Swagger tag for apis.
        description: "Get the hardware of a drone from the database.",
        path: {
            id: Joi.string().required()
        }
    },
    1: {
        model: "getDroneResources", // Name of the model
        group: "Resources", // Swagger tag for apis.
        description: "Get the resources of a drone from the drone.",
        path: {
            id: Joi.string().required()
        }
    },
    2:{
        model: "configureAndStartMavlinkQGC", // Name of the model
        group: "Setup Ground Control Station", // Swagger tag for apis.
        description: "Start setting up the configuration to forward the MAVLink Messages",
        body: {
            ipUser: Joi.string().required(),
        },
        path: {
            id: Joi.string().required()
        }
    },
    3:{
        model: "stopMavlinkQGC", // Name of the model
        group: "Setup Ground Control Station", // Swagger tag for apis.
        description: "Start stopping the forwarding of the MAVLink messages through the UDP Port Forward Server.",
        path: {
            id: Joi.string().required()
        }
    },
    4:{
        model: "checkIfDroneIsActive", // Name of the model
        group: "Drone active", // Swagger tag for apis.
        description: "Ping to the drone to check if it is active.",
        path: {
            id: Joi.string().required()
        }
    },
    5:{
        model: "getInfoAllContainersFromDrone", // Name of the model
        group: "Drone Docker containers", // Swagger tag for apis.
        description: "Retrieve all the Docker containers from the drone.",
        path: {
            id: Joi.string().required()
        }
    },
    6:{
        model: "getInfoSpecificContainerFromDrone", // Name of the model
        group: "Drone Docker containers", // Swagger tag for apis.
        description: "Retrieve specific Docker container information from the drone.",
        path: {
            id: Joi.string().required(),
            idContainer: Joi.string().required()
        }
    },
    7:{
        model: "createNewContainerOnDrone", // Name of the model
        group: "Drone Docker containers", // Swagger tag for apis.
        description: "Create a new Docker container on the drone",
        path: {
            id: Joi.string().required()
        },
        body:{
            nameContainer: Joi.string().required(),
            nameImage: Joi.string().required(),
            reservedMemory: Joi.number().required(),
            cpuShares: Joi.number().required(),
            overwriteExisting: Joi.boolean().required(),
            autoRemove: Joi.boolean().required(),
            extra_arguments: Joi.any().required()
        } 
    },
    8: {
        model: "stopContainerOnDrone", // Name of the model
        group: "Drone Docker containers", // Swagger tag for apis.
        description: "Stop a Docker container on the drone.",
        path: {
            id: Joi.string().required()
        },
        body:{
            timeOut: Joi.number().required(),
            nameStoppedContainer: Joi.string().required(),
        } 
    },
    9:{
        model: "deleteContainerOnDrone", // Name of the model
        group: "Drone Docker containers", // Swagger tag for apis.
        description: "Delete a Docker container on the drone.",
        path: {
            id: Joi.string().required()
        },
        body:{
            nameDeleteContainer: Joi.string().required(),
        } 
    },
    10:{
        model: "restartContainerOnDrone", // Name of the model
        group: "Drone Docker containers", // Swagger tag for apis.
        description: "Restart a Docker container on the drone.",
        path: {
            id: Joi.string().required()
        },
        body: {
            nameRestartContainer: Joi.string().required(),
            timeOut: Joi.number().required(),
        }
    },
    11:{
        model: "dockerSystemPruneOnDrone", // Name of the model
        group: "Drone Docker containers", // Swagger tag for apis.
        description: "Perform Docker system prune on the drone.",
        path: {
            id: Joi.string()
        }
    },
    12:{
        model: "getInfoAllImagesFromDrone", // Name of the model
        group: "Drone Docker Images", // Swagger tag for apis.
        description: "Retrieve all the Docker images from the drone.",
        path: {
            id: Joi.string()
        }
    },
    13:{
        model: "getInfoSpecificImageFromDrone", // Name of the model
        group: "Drone Docker Images", // Swagger tag for apis.
        description: "Retrieve specific info of a Docker image from the drone.",
        path: {
            id: Joi.string()
        }
    },
    14:{
        model: "deleteImageOnDrone", // Name of the model
        group: "Drone Docker Images", // Swagger tag for apis.
        description: "Delete a Docker image on the drone.",
        path: {
            id: Joi.string()
        },
        body: {
            idDeletedImage: Joi.string().required()
        }
    }
}