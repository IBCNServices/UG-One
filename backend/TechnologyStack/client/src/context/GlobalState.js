// here place the context
// if the application come bigger, divide into smaller states

import React, { createContext, useReducer} from 'react';
import AppReducer from './AppReducer';
import axios from 'axios'; 

const stagingVW = true
var ipAddress = undefined
if (stagingVW === true)
    {
        ipAddress = "http://10.2.0.184" // virtual wall
    }
else
    {
        ipAddress = "http://192.168.0.142" // local wifi
    }


console.log("Ipaddress for webserver is: " + ipAddress)


// Initial state
const initialState = {



    ////////////// DRONE ///////////////
    // list of drones
    nameAllDrones: [], // name of all the drones, this will be displayed in the left column of the drone tab

    // info specific drone
    idSpecificDrone: undefined,
    ipSpecificDrone: undefined,
    nameSpecificDrone: undefined,
    hardwareSpecificDrone: undefined,
    dataResourcesDrone: undefined,
    droneActive: undefined,

    // info specific drone, QGC mavlink
    portQGCToConnect: undefined,
    closedUDPPort: undefined,
    errorMessageOpenConnectionQGC: undefined,
    errorMessageCloseConnectionQGC: undefined,

    // info containers on drone
    listAllContainersOnDrone: undefined,
    nameSpecificContainer: undefined,
    infoObjectSpecificContainerOnDrone: undefined,

    //////////// ADD NEW DRONE /////////////
    hardwareNewDrone: [],
    droneNameExists: 'false',

    //General object to start stop restart remove docker containers and images
    dockerExtraArgumentsObject: {},

    // mavlinkport
    mavlinkPortdrone: null,

    // info images on drone
    listAllImagesOnDrone: undefined,
    idSpecificImageOnDrone: undefined,
    nameSpecificImageOnDrone: undefined,
    infoObjectSpecificImageOnDrone: undefined,

    // text for alert box, used for containers, images on drone
    textAlertBox: undefined,

    ////////////// IMAGE ///////////////
    // list of images
    nameAllImagesDockerHub: [], // name and repo(namespace) of all the images (namespace/name)
    nameAllImagesGitlab: [], // name and repo(namespace) of all the images (namespace/name)

    // info specific Image
    infoSpecificDockerHubImageObject: undefined,
    infoSpecificGitlabImageObject: undefined

}



// create context so other components and files cobjectIDNameDronean use it the initial state
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions

    ////////////////// DRONE //////////////////:
    // get the drone resources from the drone
    async function getDroneResources() {
        try {
            // get resources from the drone via the backend
            const res = await axios.get( ipAddress+':5000/api/v1/drone/'+ state.idSpecificDrone +'/resources');

            dispatch({
                type: 'GET_DRONERESOURCES',
                payload: res.data.data
            })


        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)

        }
    }

    // check if the drone is running 
    async function CheckIfDroneExists(idDrone) {
        try {

        
            await axios.get( ipAddress+':5000/api/v1/drone/'+ idDrone +'/active')
            .then(function(message){

                dispatch({
                    type: 'CHECK_DRONE_ACTIVE',
                    payload: true
                })
            })
            .catch(function(error){

                dispatch({
                    type: 'CHECK_DRONE_ACTIVE',
                    payload: false
                })
            })
        

        
            

            


        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
            dispatch({
                type: 'CHECK_DRONE_ACTIVE',
                payload: false
            })

        }
    }
    
    

    // get the hardware from the drone from the database.
    async function getDroneHardware() {

        if(state.idSpecificDrone !== undefined)
        {        
    
            try {
                    const res = await axios.get(ipAddress + ':5000/api/v1/drone/'+ state.idSpecificDrone +'/hardware');
    
    
                dispatch({
                    type: 'GET_DRONEHARDWARE',
                    payload: res.data.data
                })
    
    
            } catch (error) {
                console.log("Error occured")                
                console.log(error.message)
            }
        }
        
    }

    // if the user adds a new drone, delete the hardware the user has added in the app level state of the web aplication 
    function deleteNewDroneHardware(id) {
        try {

            dispatch({
                type: 'DELETE_NEWDRONEHW',
                payload: id
            })



        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    }

    // add the hardware element in the list of hardware that are implemented on the drone
    function addNewDroneHardware(hardware) {
        try {

            dispatch({
                type: 'ADD_NEWDRONEHW',
                payload: hardware
            })



        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    } 

    // add the new drone to the database of drones 
    async function addNewDroneToDatabase(newDrone){
               

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            // check if drone name exists
            const resNameExist = await axios.get(ipAddress+':5000/api/v1/drones/'+newDrone.nameDrone)


            if(resNameExist.data.data === true){
                //dronename exists
                // the state must be changed here, I don't know why but if it is changed in the app reducer the old value still remains
                // needs to be solved
                state.droneNameExists = true 
                dispatch({
                    type: 'NAMEDRONE_EXISTS',
                    payload: resNameExist.data.data

                })
                
            }
            else{

                // drone doesn't exist, send drone to database
                const resNewDrone = await axios.post(ipAddress+':5000/api/v1/drones', newDrone, config);
                console.log(resNewDrone.data)
                dispatch({
                    type: 'ADD_DRONE',
                    payload: resNewDrone.data.data
                })

            }

            
        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    }

    // deletes the drone from the database
    async function deleteDroneFromDatabase(idDrone)
    {
        try {

            await axios.delete(`${ipAddress}:5000/api/v1/drones/${idDrone}`);

            dispatch({
                type: 'DELETE_DRONE',
                payload: idDrone
            })

            console.log(state.nameAllDrones)

        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    }

    // get all the drones their name and id from the database.
    async function getNameAllDrones() {
        try {
            const res = await axios.get(ipAddress + ':5000/api/v1/drones');


            dispatch({
                type: 'GET_NAMEALLDRONES',
                payload: res.data.data
            })


        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    }

    // updates the drone his id and name in the global app level state
    function updateIdNameIpDrone(idNameIpDrone)
    {
        try {


            dispatch({
                type: 'UPDATE_IDNAMEIPDRONE',
                payload: idNameIpDrone
            })


        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    }

    // start the message forwarding between QGroundControl and the specific drone
    async function startConnectionQGCDroneClient(ipUser){
    
        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const configDataConnection = {
                idDrone: state.idSpecificDrone,
                ipUser
            }

            // send request to start forwarding data between drone en QGroundControl
            const res = await axios.post(ipAddress + ':5000/api/v1/drone/'+ state.idSpecificDrone +'/location/start', configDataConnection, config);

            if(res.data.success === true){
                // success: open an udp port

                const updateDataForAppReducer = {
                    portQGCToConnect: res.data.data.portUser,
                    closedUDPPort: undefined,
                    errorMessageOpenConnectionQGC: undefined,
                    errorMessageCloseConnectionQGC: undefined
                }

                dispatch({
                    type: 'UPDATE_CONNECTIONUDPPORT',
                    payload: updateDataForAppReducer
                })
            }
            else{
                // didn't succeed to open up the udp sockets ont the UDP  port forward server

                const updateDataForAppReducer = {
                    portQGCToConnect: undefined,
                    closedUDPPort: undefined,
                    errorMessageOpenConnectionQGC: res.data.message,
                    errorMessageCloseConnectionQGC: undefined
                }
                dispatch({
                    type: 'UPDATE_CONNECTIONUDPPORT',
                    payload: updateDataForAppReducer
                })
            }


            
        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    }

    // stop forwarding the data between QGroundControl and the drone
    async function stopConnectionQGCDroneClient(){
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        try {
    
            const configDataConnection = {
                
            }
    
            // send request to stop forwarding the udp messages of a specific drone
            const res = await axios.post(ipAddress + ':5000/api/v1/drone/'+ state.idSpecificDrone +'/location/stop', configDataConnection, config);
    
            if(res.data.success === true){
                // it workt to close the udp port
                const updateDataForAppReducer = {
                    portQGCToConnect: undefined,
                    closedUDPPort: "UDP Port Closed",
                    errorMessageOpenConnectionQGC: undefined,
                    errorMessageCloseConnectionQGC: undefined
                }

                dispatch({
                    type: 'UPDATE_CONNECTIONUDPPORT',
                    payload: updateDataForAppReducer
                })
            }
            else{

                // it did not work to close the udp port
                const updateDataForAppReducer = {
                    portQGCToConnect: undefined,
                    closedUDPPort: undefined,
                    errorMessageOpenConnectionQGC: undefined,
                    errorMessageCloseConnectionQGC: res.data.message
                }

                dispatch({
                    type: 'UPDATE_CONNECTIONUDPPORT',
                    payload: updateDataForAppReducer
                })
            }
    
    
            
        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    }

    // get the mavlinkport from a specific drone 
    async function getDroneMAVLinkPort(idDrone) {
        try {
            // send request to start deploying a Docker container
            await axios.get(ipAddress + ':5000/api/v1/drone/'+ idDrone +'/location/ports')
            .then(function(message){   
                  
                dispatch({
                    type: 'GET_MAVLINK_CLIENTPORT',
                    payload: message.data.data.portMavlink
                })
            })
            .catch(function(error){
                dispatch({
                    type: 'GET_MAVLINK_CLIENTPORT',
                    payload: null
                })
            })


        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    }


    ///////////////////// CONTAINER ON DRONE ////////////////////
    // get all the containers that are on the drone
    async function getInfoAllContainers() {
        try {
            // retrieve all the containers
            const res = await axios.get(ipAddress + ':5000/api/v1/drone/'+ state.idSpecificDrone + '/containers');

            dispatch({
                type: 'GET_INFOALLCONTAINERS',
                payload: res.data.data
            })


        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    }

    // get info of a specific container on a drone
    async function getInfoSpecificContainerOnDrone(idContainer) {
        try {
            const res = await axios.get(ipAddress + ':5000/api/v1/drone/'+ state.idSpecificDrone +'/containers/'+ idContainer);

            dispatch({
                type: 'GET_INFOSPECIFICCONTAINER',
                payload: res.data.data
            })


        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    }

    // deletes an argument from the list of arguments that the user wants to use to deploy a docker container
    function DeleteDockerArgument(argumentName) {
        try {

            dispatch({
                type: 'DELETE_DOCKERARGUMENT',
                payload: argumentName
            })



        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    }

    // add a Docker argument in the list of the Docker arguments the user wants to sent to the drone to deploy a Docker contaienr
    function addDockerArgumentToDockerArgumentsObject(nameArgument, valueArgument, typeArgument) {
        try {

            var newValueArgument = undefined;

            switch (typeArgument){
                case "number": // convert to a number
                    var tempCheckNumber = parseInt(valueArgument);
                    if (isNaN(tempCheckNumber))
                        newValueArgument = undefined;
                    else
                        newValueArgument = tempCheckNumber

                    break;

                case "boolean": // convert to a boolean
                    if(valueArgument.toLowerCase() === "true")
                        newValueArgument = true;
                    else if(valueArgument.toLowerCase() === "false")
                        newValueArgument = false;
                    else
                        newValueArgument = undefined
                    break;

                case "list": // convert to a list format
                    var newValueArgumentTrimmed = valueArgument.trim()
                    newValueArgument = newValueArgumentTrimmed.slice(1,newValueArgumentTrimmed.length-1)
                    newValueArgument = JSON.parse("[" + newValueArgument + "]")// array in array otherwise.
                    break;

                case "dictionary": // convert to a dictionary format
                    newValueArgument = JSON.parse(valueArgument)
                    break;

                default:// default string
                    newValueArgument = valueArgument
                    break;
            }
                

            const updateDockerArgumentObject = {
                nameArgument,
                newValueArgument,
            }

            dispatch({
                type: 'ADD_DOCKERARGUMENT',
                payload: updateDockerArgumentObject
            })



        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    } 

    // create a new container on the drone
    async function CreateNewContainerOnDrone(argumentsForContainer) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const sendCreateInfoContainerToDrone = {...argumentsForContainer, ...state.dockerExtraArgumentsObject}

            // send request to start deploying a Docker container
            await axios.post(ipAddress + ':5000/api/v1/drone/'+ state.idSpecificDrone +'/containers/create', sendCreateInfoContainerToDrone, config)
                .then(function(message){        
                    dispatch({
                        type: 'CREATE_CONTAINERONDRONE',
                        payload: message.data.message
                    })
                })
                .catch(function(error){
                    dispatch({
                        type: 'CREATE_CONTAINERONDRONE',
                        payload: error.response.data.message
                    })
                })
            


        } catch (error) {
            console.log("Error occured")            
            console.log(error.response.data.message)
        }
    }

    // stop a container on the drone
    async function StopContainerOnDrone(argumentsForContainer) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const sendInfoStopContainerToDrone = {...argumentsForContainer, ...state.dockerExtraArgumentsObject, nameStoppedContainer: state.nameSpecificContainer.substr(1)} // substring because otherwise you will have /namecontainer instead of namecontainer

            // send request to the drone to stop a Docker container
            await axios.post(ipAddress + ':5000/api/v1/drone/'+ state.idSpecificDrone +'/containers/stop', sendInfoStopContainerToDrone, config)
                .then(function(message){        
                    dispatch({
                        type: 'STOP_CONTAINERONDRONE',
                        payload: message.data.message
                    })
                })
                .catch(function(error){
                    dispatch({
                        type: 'STOP_CONTAINERONDRONE',
                        payload: error.response.data.message
                    })
                })


        } catch (error) {
            console.log("Error occured")            
            console.log(error.response.data.message)
        }
    }

    // remove a container on the drone
    async function RemoveContainerOnDrone() {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            var sendInfoDeleteContainerToDrone = state.dockerExtraArgumentsObject
            sendInfoDeleteContainerToDrone.nameDeleteContainer = state.nameSpecificContainer;

            // send a request to remove a docker container on the drone
            await axios.post(ipAddress + ':5000/api/v1/drone/' + state.idSpecificDrone + '/containers/remove', sendInfoDeleteContainerToDrone, config)
                .then(function(message){        
                    dispatch({
                        type: 'DELETE_CONTAINERONDRONE',
                        payload: message.data.message
                    })
                })
                .catch(function(error){
                    dispatch({
                        type: 'DELETE_CONTAINERONDRONE',
                        payload: error.response.data.message
                    })
                })


        } catch (error) {
            console.log("Error occured")            
            console.log(error.response.data.message)
        }
    }

    // saves the name of the container  to global state (when user pressed on a specific container for more info)
    function SaveContainerNameToGlobalState(nameContainer) {
        try {

            dispatch({
                type: 'SAVE_CONTAINERNAME',
                payload: nameContainer
            })


        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    }

    // restart a container on the drone
    async function RestartContainerOnDrone(argumentsForContainer) {
        try {
            console.log('restart een container')
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            var sendInfoRestartContainerOnDrone = {...argumentsForContainer, ...state.dockerExtraArgumentsObject}
            sendInfoRestartContainerOnDrone.nameRestartContainer = state.nameSpecificContainer;

            // send a request to restart a container on the drone
            await axios.post(ipAddress + ':5000/api/v1/drone/' + state.idSpecificDrone + '/containers/restart', sendInfoRestartContainerOnDrone, config)
                .then(function(message){

                    dispatch({
                        type: 'RESTART_CONTAINERONDRONE',
                        payload: message.data.message
                    })
                })
                .catch(function(error){
                    console.log("Error occured")            
                    console.log(error.response.data.message)
                    dispatch({
                        type: 'RESTART_CONTAINERONDRONE',
                        payload: error.response.data.message
                    })
                })
            


        } catch (error) {
            console.log("Error occured")            
            console.log(error.response.data)
        }
    }

    // deletes arguments from dockerExtraArgumentsObject
    function CleanupCancelContainerAction() {
        try {

            dispatch({
                type: 'CLEANUP_CONTAINERDATA',
            })



        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    }

    //////////////// IMAGES ON THE DRONE //////////////////
    // get all the images from the drone.
    async function getInfoAllDockerImages() {
        try {
            // send request to get info of all images on the drone
            const res = await axios.get(ipAddress + ':5000/api/v1/drone/'+ state.idSpecificDrone +'/images');

            dispatch({
                type: 'GET_INFOALLIMAGES',
                payload: res.data.data
            })


        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    }

    // get info of a specific image from a drone
    async function getInfoSpecificImageOnDrone(idImage) {
        try {
            
            // send request to get specific Docker image from the drone
            const res = await axios.get(ipAddress + ':5000/api/v1/drone/'+ state.idSpecificDrone +'/images/'+ idImage);
            

            dispatch({
                type: 'GET_INFOSPECIFICIMAGE',
                payload: res.data.data
            })


        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    }

    // remove a container from the drone
    async function RemoveImageOnDrone() {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            var sendInfoDeleteImageOnDrone = state.dockerExtraArgumentsObject
            sendInfoDeleteImageOnDrone.idDeleteImage = state.idSpecificImageOnDrone;

            // send request to remove an image from the drone
            await axios.post(ipAddress + ':5000/api/v1/drone/' + state.idSpecificDrone + '/images/remove', sendInfoDeleteImageOnDrone, config)
                .then(function(message){
                    dispatch({
                        type: 'DELETE_IMAGEONDRONE',
                        payload: message.data.message
                    })
                })
                .catch(function(error){
                    dispatch({
                        type: 'DELETE_IMAGEONDRONE',
                        payload: error.response.data.message
                    })
                })


        } catch (error) {
            console.log("Error occured")            
            console.log(error.response.data.message)
        }
    }

    // saves the name of the image and image id to the global state 
       function saveImageIDAndNameToGlobalState(idImage, nameImage) {
        try {


            const sendToAppReducer = {
                idImage,
                nameImage
            }

            dispatch({
                type: 'SAVE_IMAGEIDANDNAME',
                payload: sendToAppReducer
            })



        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    }

    // send a request to perform a docker system prune
    async function DockerSystemPruneOnDrone() {
        try {

            await axios.post(ipAddress + ':5000/api/v1/drone/'+ state.idSpecificDrone +'/docker-unused-objects/prune')
                .then(function(message){
                    dispatch({
                        type: 'PRUNE_DOCKERCONTAINERSIMAGES',
                        payload: message.data.message
                    })
                })
                .catch(function(error){
                    dispatch({
                        type: 'PRUNE_DOCKERCONTAINERSIMAGES',
                        payload: error.response.data.message
                    })
                })


        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    }

    // cleans up the text that needs to be displayed in the textalertbox 
    function CleanupTextAlertBox(){
        try {

            dispatch({
                type: 'CLEANUP_TEXTALERTBOX',
            })



        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    }




    
   
    ////////////////// IMAGES ////////////////////

        /////// MAIN ACTIONS FOR GITLAB AND DOCKERHUB IMAGES //////

    // get all the names of the images that are saved on the database
    async function getNameAllImages() {
        try {

            const res = await axios.get(ipAddress + ':5000/api/v1/dockerimages');
    

            dispatch({
                type: 'GET_NAMEALLIMAGES',
                payload: res.data.data
            })


        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    }

    ////// DOCKER HUB //////
    // add all the names of the images from a namespace of dockerhub to the database
    async function addImagesFromNamespaceDockerHub(namespace) {
        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            
            const res = await axios.post(ipAddress + ':5000/api/v1/dockerimages/docker_hub/addpublicimagesfromnamespace', namespace, config);

            dispatch({
                type: 'ADD_IMAGESFROMNAMESPACE_DOCKERHUB',
                payload: res.data.data
            })


        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    }

    // add a specific name of an image from the docker hub registry to the database
    async function addSpecificImageFromNamespaceDockerHub(namespaceAndNameObject) {
        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }


            const res = await axios.post(ipAddress + ':5000/api/v1/dockerimages/docker_hub/addspecificpublicimage', namespaceAndNameObject, config);


            dispatch({
                type: 'ADD_SPECIFICIMAGEFROMNAMESPACE_DOCKERHUB',
                payload: res.data.data
            })


        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    }


    // deletes a Docker Hub image from the database
    async function deleteDockerHubImageFromDatabase(idImage_DockerhubOrGitlabImage)
    {
        try {

            await axios.delete(`${ipAddress}:5000/api/v1/dockerimages/docker_hub/${idImage_DockerhubOrGitlabImage}`);

            dispatch({
                type: 'DELETE_IMAGE_DOCKERHUB',
                payload: idImage_DockerhubOrGitlabImage
            })


        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    }

    // get the information of a specific Docker Hub Image from Docker Hub
    async function getInfoSpecificImageFromNamespaceDockerHub(namespaceAndNameObject) {
        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            
            const res = await axios.post(ipAddress + ':5000/api/v1/dockerimages/docker_hub/getspecificpublicimage', namespaceAndNameObject, config);


            dispatch({
                type: 'GET_SPECIFICIMAGEFROMNAMESPACE_DOCKERHUB',
                payload: res.data.data
            })


        } catch (error) {
        console.log("Error occured")        
        console.log(error.message)
        }
    }


    ///// GITLAB /////

    // send a request to get a specific image from gitlab, and save all the info on the database
    async function addSpecificImageFromGitlab(token_IdProject_PathImageObject) {
        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }


            
            const res = await axios.post(ipAddress + ':5000/api/v1/dockerimages/gitlab_imec/addspecificimage', token_IdProject_PathImageObject, config);

            dispatch({
                type: 'ADD_SPECIFICIMAGE_GITLAB',
                payload: res.data.data
            })


        } catch (error) {
            console.log("Error occured")            
            console.log(error.message)
        }
    }
    
    // send a request to get a specific GitLab image that is stored on the database
    async function getInfoSpecificImageGitlab(pathImage) {
        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            
            await axios.post(ipAddress + ':5000/api/v1/dockerimages/gitlab_imec/getspecificimage', {pathImage}, config)
                .then(function(message){
         

                    dispatch({
                        type: 'GET_SPECIFICIMAGE_GITLAB',
                        payload: message.data.data
                    })
                })
                .catch(function(error){
            

                    dispatch({
                        type: 'GET_SPECIFICIMAGE_GITLAB',
                        payload: error
                    })
                })



        } catch (error) {
        console.log("Error occured")        
        console.log(error.message)
        }
    }

    // deletes a GitLab image from the database
    async function deleteGitlabImageFromDatabase(idImageGitlab)
    {
        try {
         
            await axios.delete(`${ipAddress}:5000/api/v1/dockerimages/gitlab_imec/${idImageGitlab}`);
            dispatch({
                type: 'DELETE_IMAGE_GITLAB',
                payload: idImageGitlab
            })


        } catch (error) {
            console.log("Error occured")            
            console.log(error.response)
        }
    }


    
    return (<GlobalContext.Provider value={{
        ////////////////////////////////// state ///////////////////
        //// DRONES ///////
        dataResourcesDrone: state.dataResourcesDrone,
        hardwareNewDrone: state.hardwareNewDrone,
        droneNameExists: state.droneNameExists,
        nameAllDrones: state.nameAllDrones,
        idSpecificDrone: state.idSpecificDrone,
        ipSpecificDrone: state.ipSpecificDrone,
        nameSpecificDrone: state.nameSpecificDrone,
        hardwareSpecificDrone: state.hardwareSpecificDrone,
        droneActive: state.droneActive,
        //////////// LOCATION DRONE /////////
        portQGCToConnect: state.portQGCToConnect,
        closedUDPPort: state.closedUDPPort,
        errorMessageOpenConnectionQGC: state.errorMessageOpenConnectionQGC,
        errorMessageCloseConnectionQGC: state.errorMessageCloseConnectionQGC,
        listAllContainersOnDrone: state.listAllContainersOnDrone,
        nameSpecificContainer: state.nameSpecificContainer,
        infoObjectSpecificContainerOnDrone: state.infoObjectSpecificContainerOnDrone,
        dockerExtraArgumentsObject: state.dockerExtraArgumentsObject,
        listAllImagesOnDrone: state.listAllImagesOnDrone,
        idSpecificImageOnDrone: state.idSpecificImageOnDrone,
        nameSpecificImageOnDrone: state.nameSpecificImageOnDrone,
        infoObjectSpecificImageOnDrone: state.infoObjectSpecificImageOnDrone,
        textContainerImageActionStartStopCreateRemove: state.textContainerImageActionStartStopCreateRemove,
        textAlertBox: state.textAlertBox,
        mavlinkPortdrone: state.mavlinkPortdrone,
        ///// IMAGES //////
        nameAllImagesDockerHub: state.nameAllImagesDockerHub,
        nameAllImagesGitlab: state.nameAllImagesGitlab,
        infoSpecificDockerHubImageObject: state.infoSpecificDockerHubImageObject,
        infoSpecificGitlabImageObject: state.infoSpecificGitlabImageObject,
        ///////////////////methods/////////////////////////////
        //////// DRONES //////////////
        getDroneResources,
        CheckIfDroneExists,
        getDroneHardware,
        deleteNewDroneHardware,
        addNewDroneHardware,
        addNewDroneToDatabase,
        deleteDroneFromDatabase,
        getNameAllDrones,
        updateIdNameIpDrone,
        startConnectionQGCDroneClient,
        stopConnectionQGCDroneClient,
        getInfoAllContainers,
        getInfoSpecificContainerOnDrone,
        DeleteDockerArgument,
        addDockerArgumentToDockerArgumentsObject,
        CreateNewContainerOnDrone,
        StopContainerOnDrone,
        RemoveContainerOnDrone,
        SaveContainerNameToGlobalState,
        RestartContainerOnDrone,
        CleanupCancelContainerAction,
        getInfoAllDockerImages,
        getInfoSpecificImageOnDrone,
        RemoveImageOnDrone,
        saveImageIDAndNameToGlobalState,
        DockerSystemPruneOnDrone,
        CleanupTextAlertBox,
        getDroneMAVLinkPort,
        //////////// IMAGES //////////////
        // docker
        addImagesFromNamespaceDockerHub,
        addSpecificImageFromNamespaceDockerHub,
        deleteDockerHubImageFromDatabase,
        getInfoSpecificImageFromNamespaceDockerHub,
        // main gitlab and docker
        getNameAllImages,
        // gitlab
        addSpecificImageFromGitlab,
        getInfoSpecificImageGitlab,
        deleteGitlabImageFromDatabase
        

    }}>
        { children }
    </GlobalContext.Provider>)
}