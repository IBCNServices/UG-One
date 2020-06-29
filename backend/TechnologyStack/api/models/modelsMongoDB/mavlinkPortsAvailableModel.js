// make a schema for the data
const mongoose = require('mongoose');


const MavlinkPortAvailableSchema = new mongoose.Schema({
    _id:{
        type: String,
        trim: true, 
        required: [true, 'id of the mavlink connection']
    }, 
    drone_serverConnected:{
        type: Boolean
    },
    server_clientConnected:{
        type: Boolean
    },
    idDrone: {
        type: String,
        trim: true, 
    },
    ipDrone: {
        type: String,
        trim: true, 
    },
    portMavlink: {
        type: Number,
    },
    ipUser: {
        type: String,
        trim: true, 
    },
    portUser: {
        type: Number,
    }

});

module.exports = mongoose.model('mavlinkports', MavlinkPortAvailableSchema);