// methods for getting the docker images

const infoDockerHubImages = require('../../../models/modelsMongoDB/DockerHubImagesModel')

const dockerHubAPI = require('docker-hub-api')

// @desc    get the images from a dockerhub registry
// @route   POST /api/v1/dockerimages/docker_hub/addpublicimagesfromnamespace
// @access  Public
exports.addPublicDockerHubImagesNamespace = async (req, res, next) => {
    
    try {

        const{ namespace } = req.body
                
        // get all docker images from namespace/registry 
        // allImagesNamespace is an array of objects
        var allImagesNamespace = await dockerHubAPI.repositories(namespace)

        // save images in the database
        const addNewImages = await infoDockerHubImages.create(allImagesNamespace);

        return res.status(201).json({
            success: true,
            data: addNewImages,
            message: "Added a Public Docker Image Namespace."
        })



    } catch (error) {
        console.log("Failed to add a public Docker Image namespace, server error!")

        return res.status(500).json({
            success: false,
            data: error,
            message: "Failed to add a public Docker Image namespace, server error!"
        })
    }
        
        
}


// @desc    get a specific image from a dockerhub namespace
// @route   POST /api/v1/dockerimages/docker_hub/getspecificpublicimage
// @access  Public
exports.getSpecificPublicDockerHubImage = async (req, res, next) => {
    
    try {
        const{ namespace, name } = req.body

        // retrieves a specific docker image from a specific Docker Hub registry
        // transforms the retrieved data from the Docker hub image and send the data back in the response
        const infoSpecificImage = await dockerHubAPI.repository(namespace, name)
        
        const sendSpecificInfoBack = {
            user: infoSpecificImage.user,
            name: infoSpecificImage.name,
            namespace: infoSpecificImage.namespace,
            repository_type: infoSpecificImage.repository_type,
            description: infoSpecificImage.description,
            last_updated: new Date(infoSpecificImage.last_updated).toString().substr(0,34)
        }
        return res.status(200).json({
            success: true,
            data: sendSpecificInfoBack,
            message: "Succeeded to retrieve information of a specific docker image."
        }) 
    
    


    } catch (error) {
        console.log("Failed to get a specific public docker image, server error!")

        return res.status(500).json({
            success: false,
            data: error,
            message: "Failed to get a specific public Docker Image, server error!"
        })
    }
}

// @desc    get a specific image from a dockerhub namespace
// @route   POST /api/v1/dockerimages/docker_hub/addspecificpublicimage
// @access  Public
exports.addSpecificPublicDockerHubImage = async (req, res, next) => {
    
    try {
        const{ namespace, nameImage } = req.body

        const infoSpecificImage = await dockerHubAPI.repository(namespace, nameImage)
        
        // search if the image already exists in the database
        const nameImageExists = await infoDockerHubImages.findOne({namespace: infoSpecificImage.namespace, name: infoSpecificImage.name});

        if (nameImageExists === null){
            // save image in the database if it does not exist
            const addNewImage = await infoDockerHubImages.create(infoSpecificImage);

            return res.status(201).json({
                success: true,
                data: addNewImage,
                message: "Successfully added info of a specific image of dockerhub to the database."
            })
        }
        else{
            // don't add the image to the database
            return res.status(200).json({
                success: false,
                data: {},
                message: "The image already exists in the database."
            })
        }
    


    } catch (error) {
        console.log("Failed to add a specific public Docker Image, server error!")

        return res.status(500).json({
            success: false,
            data: error,
            message: "Failed to add a specific public Docker Image, server error!"
        })
    }
}

// @desc    delete a image from the database
// @route   DELETE /api/v1/dockerimages/docker_hub/:id
// @access  Public
exports.deleteDockerHubImageFromDatabase = async (req, res, next) => {
    try {
        
        // check if dockerhub image exist in database
        // if it exists delete the image
        const deletedImage = await infoDockerHubImages.findById(req.params.id);
        if(!deletedImage) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'The image with the given id is not found, so the image is not deleted from the database.'
            })
        }

        // remove the drone from the database
        await deletedImage.remove();


        return res.status(200).json({
            success: true,
            data: {},
            message: "Image info deleted from the database."
        })


    } catch (error) {
        console.log("Failed to delete a specific image from the database, server error!")

        return res.status(500).json({
            success: false,
            data: error,
            message: "Failed to delete a specific image from the database, server error!"
        })
    }
}