// all the hardware of the drone methods to interact with the database
const axios = require('axios');


const infoDrones = require('../../../models/modelsMongoDB/DroneinfoModel')



// @desc    Get all the images on the drone
// @route   GET /api/v1/drone/:id/images
// @access  Public
exports.getInfoAllImagesFromDrone = async (req, res, next) => {
    
    try {
        var ipAddressDrone = undefined
        
        // retrieve IP address of the drone from the database
        await infoDrones.findOne({_id: req.params.id}, "ipDrone")
            .then(function(message){
                ipAddressDrone = "http://"+message.ipDrone
            })
            .catch(function(error){
                return res.status(400).json({
                    success: false,
                    data: error,
                    message: "could not retrieve the ip of the drone."
                }) 
            })

        // send a GET request to get all the images from the drone
        await axios.get(ipAddressDrone+':14500/applications/images')
            .then(function(message){
                
                var infoAllImages = message.data.images
                for (var containerNumber = 0; containerNumber < infoAllImages.length; containerNumber++)
                {
                    delete infoAllImages[containerNumber]['tags']
                    infoAllImages[containerNumber]['created'] = new Date(infoAllImages[containerNumber].created).toString().substr(0,34);
                }
        
                return res.status(200).json({
                    success: true,
                    data: infoAllImages,
                    message: "Info all images on drone "
                })    
       
            })
            .catch(function(error){
                return res.status(400).json({
                    success: false,
                    data: error.response.data,
                    message: "Did not succeed to get all the images from the drone."
                })   
            })

    


    } catch (error) {
        console.log("Server error, info all images.")
        return res.status(500).json({
            success: false,
            message: "Server error, info all images failed.",
            data: error
        })
    }
}

// @desc    Get info of a specific image on the drone
// @route   GET /api/v1/drone/:id/containers/:idContainer
// @access  Public
exports.getInfoSpecificImageFromDrone = async (req, res, next) => {
    
    try {

        var ipAddressDrone = undefined
        
        // retrieve the IP address of the drone from the database
        await infoDrones.findOne({_id: req.params.id}, "ipDrone")
            .then(function(message){
                ipAddressDrone = "http://"+message.ipDrone
            })
            .catch(function(error){
                return res.status(400).json({
                    success: false,
                    data: error,
                    message: "could not retrieve the ip of the drone."
                }) 
            })

        const { idImage} = req.params

        // send a GET request to retrieve all the images of the drone
        // from all the images, filter for the desired image and send the additional info of specific image back 
        await axios.get(ipAddressDrone+':14500/applications/images')
            .then(function(message){
                const infoAllImages = message
                const infoSpecificImage = infoAllImages.data.images.filter(image => image.image_id === idImage)[0] // filter for the right image 
        
                infoSpecificImage['created'] = new Date(infoSpecificImage.created).toString().substr(0,34); // substring otherwise you have +0000, not usefull


                return res.status(200).json({
                    success: true,
                    data: infoSpecificImage,
                    message: "Info Specific container."
                })        
            })
            .catch(function(error){
                return res.status(400).json({
                    success: false,
                    data: error.response.data,
                    message: "Did not succeed to get the info of a specific image from the drone."
                })   
            })

        


    } catch (error) {
        console.log("Server error, info specific image on drone.")
        return res.status(500).json({
            success: false,
            message: "Server error, info specific image on drone failed.",
            data: error
        })
    }
}


// @desc    delete an image on the drone
// @route   POST /api/v1/drone/:id/images/remove
// @access  Public
exports.deleteImageOnDrone = async (req, res, next) => {
    
    try {

        var ipAddressDrone = undefined
        // retrieve the IP address of the drone from the database
        await infoDrones.findOne({_id: req.params.id}, "ipDrone")
            .then(function(message){
                ipAddressDrone = "http://"+message.ipDrone
            })
            .catch(function(error){
                return res.status(400).json({
                    success: false,
                    data: error,
                    message: "could not retrieve the ip of the drone."
                }) 
            })

        var { idDeleteImage } = req.body
        var infoDeleteImageData = req.body
        delete infoDeleteImageData['idDeleteImage']

        // force the removal of the image to true, otherwise errors will occur
        infoDeleteImageData.force = true;

        // send a delete request to the database
        await axios.delete(ipAddressDrone+":14500/applications/images/" + idDeleteImage, {data: infoDeleteImageData})
            .then(function(message) {
                return res.status(200).json({
                    success: true,
                    data: null,
                    message: "Image successfully deleted."
                })     
            })
            .catch(function(error) {
                return res.status(400).json({
                    success: false,
                    data: error.response.data,
                    message: error.response.data.message
                })     
            })
  


    } catch (error) {
        console.log("Server error, image delete from drone.")
        return res.status(500).json({
            success: false,
            message: "Server error, image delete from drone failed.",
            data: error
        })
    }
}