const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const connectDBMongo = require('./config/dbMongo');
const checkMavlinkPortsExist = require('./config/check_mavlinkports')
const cors = require('cors');
const swagger = require("swagger-generator-express");
const yaml = require('js-yaml');
const fs = require('fs');


// routes variables from frontend to backend to get or push the info from the server/database/drone
const dronesInfoRoute = require('./routes/frontend/DronesInfoRoute') ;
const droneSpecificInfoRoute = require('./routes/frontend/DroneSpecificInfoRoute');

// routes variables from fontend to backend to get the images from a docker hub repository
const dockerImagesRoute = require('./routes/frontend/DockerImagesRoute')

//routes variables from drone to backend to get info or push info to the server/database/client
const apiDroneMavlinkPortRoute = require('./routes/api_drone/MavlinkAvailablePortsRoute')


// to use global variables stored in yaml file
let config = {};
try {
    config = yaml.safeLoad(fs.readFileSync('./config/config.yml', 'utf8'));

} catch (error) {
    console.log('error reading the yaml file.')
    console.log(error);
}

// connect with mongoDB
connectDBMongo(); 

// check if the 100 MAVLinkPorts are stored in the database, if not, add them
checkMavlinkPortsExist();

const app = express();

app.use(cors());

// allows us to use the body parser for post request
app.use(express.json()) 

// routes info all drones and a specific drone
app.use('/api/v1/drones', dronesInfoRoute); // routes info all drones
app.use('/api/v1/drone', droneSpecificInfoRoute); // routes info one specific drone

// routes info images 
app.use('/api/v1/dockerimages', dockerImagesRoute); // routes info dockerImages

//routes drone connects to backend
app.use('/api/v1', apiDroneMavlinkPortRoute); // give an available port number to the drone to connect the px4 with.


// swagger options object 
const options = {
    title: "Masterproef Backend-api",
    version: "1.0.0",
    host: "localhost:5000",
    basePath: "/",
    schemes: ["http", "https"],
    securityDefinitions: {
        Bearer: {
            description: 'Example value:- Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MmQwMGJhNTJjYjJjM',
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
        }
    },
    security: [{Bearer: []}],
    defaultSecurity: 'Bearer'
};


// start swagger api
swagger.serveSwagger(app, "/api/v1/swagger", options, {routePath: './app/routes/frontend', requestModelPath: './app/models/frontendSwagger/requestModelSwagger' , responseModelPath: './app/models/frontendSwagger/responseModelSwagger'},
                        {routePath: './app/routes/api_drone', requestModelPath: './app/models/droneSwagger/requestModelSwagger' , responseModelPath: './app/models/droneSwagger/responseModelSwagger'})



const PORT = config.PORT || 5000;

// start server to listen to a specific port
app.listen( PORT, '::' ,console.log(`Server running in ${config.NODE_ENV} mode on port ${PORT}`.yellow.bold) );