const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const swagger = require("swagger-generator-express");
const yaml = require('js-yaml');
const fs = require('fs');


// routes variables from api server to portforward server
const udpPortForwardRoute = require('./routes/mavlinkUDPportForwardRoute') ;

// to use global variables stored in yaml file
let config = {};
try {
    config = yaml.safeLoad(fs.readFileSync('./config/config.yml', 'utf8'));

} catch (e) {
    console.log('error reading the yaml file. (udp port forward server)')
    console.log(e);
}


const app = express();

app.use(cors());

// allows us to use the body parser for post request
app.use(express.json()) 

//routes request udp forward mavlink messages
app.use('/api/v1/mavlink_udp_forward', udpPortForwardRoute) // forward udp messages from drone to client

// swagger document
const options = {
    title: "swagger-generator-express",
    version: "1.0.0",
    host: "localhost:7500",
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

// start swagger API
swagger.serveSwagger(app, "/api/v1/swagger", options, {routePath: './app/routes/', requestModelPath: './app/models/requestModelSwagger', responseModelPath: './app/models/responseModelSwagger'})


const PORT = config.PORT || 7500;
// start listening to a specific port for incoming requests
app.listen( PORT, console.log(`Server running in ${config.NODE_ENV} mode on port ${PORT}`.yellow.bold) );