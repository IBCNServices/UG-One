
// make a schema for the data
const mongoose = require('mongoose');


const ModelInfoSchema = new mongoose.Schema({
    namespace: {
        type: String,
        trim: true, 
        required: [true, 'Add a namespace for the image']
    },
    name: {
        type: String,
        trim: true, 
        required: [true, 'Add a name for the image']
    },

},
);

module.exports = mongoose.model('dockerhub_images', ModelInfoSchema);