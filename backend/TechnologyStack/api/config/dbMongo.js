const mongoose = require('mongoose')
const yaml = require('js-yaml');
const fs = require('fs');

// get variables from yaml file
let config = {};
try {
    config = yaml.safeLoad(fs.readFileSync('./config/config.yml', 'utf8'));

} catch (e) {
    console.log('error reading the yaml file. (setup MongoDB database)')
    console.log(e);
}

// connect the backend api with MongoDB
const connectDBMongo = async () => {
    try {
        const conn = await mongoose.connect(config.MONGO_URI, {
            useNewUrlParser: true,
            user: config.MONGO_USER,
            pass: config.MONGO_PASS,
            useCreateIndex: true,
            useUnifiedTopology: true // warnings
        });
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (err) {
        console.log(`Error: ${err.message}`.red) 
        process.exit(1)  
    }
}

module.exports = connectDBMongo;