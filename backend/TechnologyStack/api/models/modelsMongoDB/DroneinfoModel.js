// make a schema for the data
const mongoose = require('mongoose');


const DroneInfoSchema = new mongoose.Schema({
    _id:{
        type: String,
        trim: true, 
        required: [true, 'add an id GUID to the drone']
    },
    nameDrone: {
        type: String,
        trim: true, 
        required: [true, 'Add a name for the drone']
    },
    ipDrone: {
        type: String,
        trim: true, 
    },
    hardwareDrone: [{
        _id: {type: String, trim: true, required: [true, 'Add a name of the hardware']},
        nameHardware: {type: String, trim: true, required: [true, 'Add a name of the hardware']},
        descriptionHardware: {type: String, trim: true},
        imageNameHardware: {type: String, required: [false, 'Add the imagename of the hardware']}
    }],

});

module.exports = mongoose.model('infodrones', DroneInfoSchema);