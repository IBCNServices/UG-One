export default (state, action) => {

    switch(action.type)
    {    

        ///////////////////// Action with the drones //////////////////////////

        case 'GET_DRONERESOURCES': 
            return {
                ...state,
                dataResourcesDrone: action.payload
            }

        case 'CHECK_DRONE_ACTIVE':
            return{
                ...state,
                droneActive: action.payload
            }
        
        case 'GET_DRONEHARDWARE': 
            
            return {
                ...state,
                hardwareSpecificDrone: action.payload.hardwareDrone
            }
        case 'DELETE_NEWDRONEHW': 

            return {
                ...state,
                hardwareNewDrone: state.hardwareNewDrone.filter(hardware => hardware._id !==
                    action.payload),
            }
        case 'ADD_NEWDRONEHW': 
        
            return {
                ...state,
                hardwareNewDrone: [...state.hardwareNewDrone, action.payload]
            }

        case 'NAMEDRONE_EXISTS': 

            return {
                ...state,
                droneNameExists: action.payload
            }
        
        case 'ADD_DRONE': 

            const objectIDNameDrone = {
                _id: action.payload._id,
                nameDrone: action.payload.nameDrone
            }
            
            return {
                ...state,
                idSpecificDrone: action.payload._id,
                nameSpecificDrone: action.payload.nameDrone,
                hardwareSpecificDrone: action.payload.hardwareDrone,
                hardwareNewDrone: [],
                droneNameExists: false,
                nameAllDrones: [...state.nameAllDrones, objectIDNameDrone]
        }


        case 'GET_NAMEALLDRONES': 
            return {
                ...state,
                nameAllDrones: action.payload

            }
        case 'UPDATE_IDNAMEIPDRONE': 

            return {
                ...state,
                idSpecificDrone: action.payload.idDrone,
                nameSpecificDrone: action.payload.nameDrone,
                ipSpecificDrone: action.payload.ipDrone
            }

        case 'DELETE_DRONE': 
            return {
                ...state,
                nameAllDrones: state.nameAllDrones.filter(drone => drone._id !== action.payload ),
                idSpecificDrone: undefined,
                nameSpecificDrone: undefined,
                hardwareSpecificDrone: undefined,
            }

        case 'GET_MAVLINK_CLIENTPORT': 

            return {
                ...state,
                mavlinkPortdrone: action.payload
            }


        case 'UPDATE_CONNECTIONUDPPORT': 

            return {
                ...state,
                portQGCToConnect: action.payload.portQGCToConnect,
                closedUDPPort: action.payload.closedUDPPort,
                errorMessageOpenConnectionQGC: action.payload.errorMessageOpenConnectionQGC,
                errorMessageCloseConnectionQGC: action.payload.errorMessageCloseConnectionQGC
            }

        case 'GET_INFOALLCONTAINERS':



            return {
                ...state,
                listAllContainersOnDrone: action.payload.containers,
            }
        
        case 'GET_INFOSPECIFICCONTAINER':

            return {
                ...state,
                infoObjectSpecificContainerOnDrone: action.payload
            }

        case 'DELETE_DOCKERARGUMENT':

            const deletedArgumentDockerArgumentsObject = state.dockerExtraArgumentsObject

            delete deletedArgumentDockerArgumentsObject[action.payload]

        
            return {
                ...state,
                dockerExtraArgumentsObject: deletedArgumentDockerArgumentsObject
            }

        case 'ADD_DOCKERARGUMENT':



            var newAddArgumentDockerArgumentsObject = state.dockerExtraArgumentsObject; // add all the docker arguments together for docker container actions for example deployment

            newAddArgumentDockerArgumentsObject[ action.payload.nameArgument] = action.payload.newValueArgument;


            return {
                ...state,
                dockerExtraArgumentsObject: newAddArgumentDockerArgumentsObject
            }

        case 'CREATE_CONTAINERONDRONE':

            return {
                ...state,
                dockerExtraArgumentsObject: {},
                nameSpecificContainer: undefined,
                textAlertBox: action.payload
            }

        case 'STOP_CONTAINERONDRONE':

            return {
                ...state,
                dockerExtraArgumentsObject: {},
                nameSpecificContainer: undefined,
                textAlertBox: action.payload
            }

        case 'DELETE_CONTAINERONDRONE':
            return {
                ...state,
                dockerExtraArgumentsObject: {},
                nameSpecificContainer: undefined,
                textAlertBox: action.payload

            }

        case 'SAVE_CONTAINERNAME':

            return{
                ...state,
                nameSpecificContainer: action.payload
            }

        case 'RESTART_CONTAINERONDRONE':
            return {
                ...state,
                dockerExtraArgumentsObject: {},
                nameSpecificContainer: undefined,
                textAlertBox: action.payload
            }

        case 'CLEANUP_CONTAINERDATA':

            return {

                ...state,
                dockerExtraArgumentsObject: {},
            }

        case 'GET_INFOALLIMAGES':   


            return{
                ...state,
                listAllImagesOnDrone: action.payload,
            }

        case 'GET_INFOSPECIFICIMAGE':

            return {
                ...state,
                infoObjectSpecificImageOnDrone: action.payload
            }

        case 'DELETE_IMAGEONDRONE':

            return{
                ...state,
                dockerExtraArgumentsObject: {},
                textAlertBox: action.payload

            }
        
        case 'SAVE_IMAGEIDANDNAME':

            return{
                ...state,
                idSpecificImageOnDrone: action.payload.idImage,
                nameSpecificImageOnDrone: action.payload.nameImage
            }

        case 'PRUNE_DOCKERCONTAINERSIMAGES':

            return{
                ...state,
                nameSpecificContainer: undefined,
                dockerExtraArgumentsObject: {},
                idSpecificImage: undefined,
                textAlertBox: action.payload
            }

        case 'CLEANUP_TEXTALERTBOX':

            return{
                ...state,
                textAlertBox: undefined
            }



        ////////////////////////// IMAGES ///////////////////////////
        case 'ADD_IMAGESFROMNAMESPACE_DOCKERHUB': 

            // add the newly retrieved docker images with the existing docker images on the app level state of the web application.
            var newImagesArray = state.nameAllImagesDockerHub

            if(action.payload !== undefined)
            {
                for(let step = 0; step < action.payload.length; step++)
                {
                    newImagesArray = [...newImagesArray, action.payload[step]]
                }
    
            }
            else{
                return {
                    ...state,
                }
            }

            

        case 'ADD_SPECIFICIMAGEFROMNAMESPACE_DOCKERHUB':    

            return {
                ...state,
                nameAllImagesDockerHub: [...state.nameAllImagesDockerHub, action.payload]
            }

        case 'DELETE_IMAGE_DOCKERHUB': 
            return {
                ...state,
                nameAllImagesDockerHub: state.nameAllImagesDockerHub.filter(image => image._id !== action.payload ),

            }

        case 'GET_SPECIFICIMAGEFROMNAMESPACE_DOCKERHUB': 
            return {
                ...state,
                infoSpecificDockerHubImageObject: action.payload
            }

        case 'GET_NAMEALLIMAGES': 
      
            return {
                ...state,
                nameAllImagesDockerHub: action.payload.dockerhub,
                nameAllImagesGitlab: action.payload.gitlab

            }
            


        case 'ADD_SPECIFICIMAGE_GITLAB':

            return {
                ...state,
                nameAllImagesGitlab: [...state.nameAllImagesGitlab, action.payload]
            }
            

        case 'GET_SPECIFICIMAGE_GITLAB':

            return {
                ...state,
                infoSpecificGitlabImageObject: action.payload
            }


        case 'DELETE_IMAGE_GITLAB':

            return {
                ...state,
                nameAllImagesGitlab: state.nameAllImagesGitlab.filter(image => image.image_id !== action.payload ),
            }

        default:
            return state;
    }
}