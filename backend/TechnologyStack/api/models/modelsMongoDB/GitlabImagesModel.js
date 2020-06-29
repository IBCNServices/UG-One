
// make a schema for the data
const mongoose = require('mongoose');


const ModelInfoSchema = new mongoose.Schema({
    image_id: {
        type: Number,
        required: [true, 'Add an id for the image']
    },
    name: {
        type: String,
        trim: true, 
        required: [true, 'Add a name for the image']
    },
    path: {
        type: String,
        trim: true, 
        required: [true, 'Add a path for the image']
    },
    project_id: {
        type: Number,
        required: [true, 'Add an id for the project where the image is stored.']
    },
    location: {
        type: String,
        trim: true, 
        required: [true, 'Add a location for the image']
    },
    created_at: {
        type: String,
        trim: true, 
        required: [true, 'Add a date of creation for the image']
    }

},
);

module.exports = mongoose.model('gitlab_ilab_imec_images', ModelInfoSchema);