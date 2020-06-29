const Joi = require('@hapi/joi')


module.exports = {
    0: {
        model: "initPortForwardUDPMavlinkMessagesDroneClient", // Name of the model
        group: "UDP_Port_Forward_Server", // Swagger tag for apis.
        description: "Start forwarding the messages from the MavlinkPort on the server to the clients IP ClientPort.",
        body: {
            ipDrone: Joi.string().required(),
            portMavlink: Joi.number().required(),
            ipUser: Joi.string().required(),
            portUser: Joi.number().required()
        }
    },
    1: {
        model: "initPortForwardUDPMavlinkMessagesClientDrone", // Name of the model
        group: "UDP_Port_Forward_Server", // Swagger tag for apis.
        description: "Start forwarding the messages from the ClientPort on the server to the drone his IP MavlinkPort.",
        body: {
            ipDrone: Joi.string().required(),
            portMavlink: Joi.number().required(),
            ipUser: Joi.string().required(),
            portUser: Joi.number().required()
        }
    },
    2:{
        model: "stopForwardUDPMavlinkMessages", // Name of the model
        group: "UDP_Port_Forward_Server", // Swagger tag for apis.
        description: "Stop forwarding the messages from the ClientPort on the server to the drone his IP MavlinkPort and from the MavlinkPort on the server to the clients IP ClientPort.",
        body: {
            portMavlink: Joi.number().required(),
            portUser: Joi.number().required(),
            IPbackenAPI: Joi.string().required()
        }
    }
}

