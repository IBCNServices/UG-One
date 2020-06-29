const Joi = require('@hapi/joi')


module.exports = {
    0: {
        model: "getNameDrones", // Name of the model
        group: "Drones", // Swagger tag for apis.
        description: "Get the names and info of all drones in the database."
    },
    1: {
        model: "addInfoNewDrone", // Name of the model
        group: "Drones", // Swagger tag for apis.
        description: "Add a drone to the database.",
        body: {
            nameDrone: Joi.string().required(),
            ipDrone: Joi.string().required(),
            hardwareDrone: [ 
                Joi.object({
                    _id: Joi.string(),
                    nameHardware: Joi.string(),
                    descriptionHardware: Joi.string(),
                    imageNameHardware: Joi.string()
            })
            ]
        },
    },
    2:{
        model: "deleteDroneFromDatabase", // Name of the model
        group: "Drones", // Swagger tag for apis.
        description: "Delete a drone from the database.",
        path: {
            id: Joi.string()
        }
    },
    3:{
        model: "nameDroneExist", // Name of the model
        group: "Drones", // Swagger tag for apis.
        description: "Does the name of the drone already exists in the database.",
        path: {
            nameDrone: Joi.string()
        }
    }
}

