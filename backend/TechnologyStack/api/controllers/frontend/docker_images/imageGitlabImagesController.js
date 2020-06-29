// methods for getting the docker images
const axios = require('axios');
const yaml = require('js-yaml');
const fs = require('fs');

const infoGitlabImages = require('../../../models/modelsMongoDB/GitlabImagesModel')

// to use global variables stored in yaml file
let config = {};
try {
    config = yaml.safeLoad(fs.readFileSync('./config/config.yml', 'utf8'));

} catch (error) {
    console.log('error reading the yaml file.')
    console.log(error);
}


// @desc    get a specific image from a gitlab ilabt imec project
// @route   POST /api/v1/dockerimages/gitlab_imec/addspecificimage
// @access  Public
exports.AddSpecificImageFromGitlabImec = async (req, res, next) => {
    
    try {

        const {private_token, pathImage, idProject} = req.body

        // when the parameters were not correct send to the backend, send a failed response back
        if(private_token === undefined || pathImage === undefined || idProject === undefined){ 
            return res.status(400).json({
                success: false,
                data: null,
                message: "Not all parameters were correctly send."
            })
    
        }  
        else{
            // first check if the image already exists, if the image exists then return status code 200 image exists already
            // if the image does not exist, add it to the database

            const gitlabImageExists = await infoGitlabImages.findOne({path: pathImage})

            // image does not exits
            if(gitlabImageExists === null){

                // place in the header a private token
                var instance = axios.create({
                    headers: {'PRIVATE-TOKEN': private_token}
                })
    
                // retrieve the information from the gitlab api server
                // not one docker image but all the images were retrieved. 
                // the filter function searches for the desired gitlab docker image
                instance.get(config.GITLABAPI_URI + '/projects/'+ idProject + "/registry/repositories")
                .then( function (response) {
                    // when succeeded save the data of the image in the database 

                    var listImagesGitlab = response.data
                    
                    // search for the desired docker image
                    const imageGitlab = listImagesGitlab.filter(image => image.path === pathImage)
    
                    if(imageGitlab.length === 1){ // image exist on gitlab
                        imageGitlab[0]['image_id'] = imageGitlab[0].id
                        delete imageGitlab[0]['id']
                        infoGitlabImages.create(imageGitlab[0])
    
                        return res.status(200).json({
                            success: true,
                            data: imageGitlab[0],
                            message: "Successfully added the image to the database."
                        })
                    }
                    else{
                        return res.status(400).json({
                            success: false,
                            data: null,
                            message: "Image does not exist, are you sure the path name or project id is correct?"
                        })
                    }
    
                })
                .catch(function (error) {
                    return res.status(400).json({
                        success: false,
                        data: error,
                        message: "Did not succeed to get the image from Gitlab, is the Private Token still valid?"
                    })
    
                })
            }
            // image already exists in the database
            else{
                return res.status(200).json({
                    success: true,
                    data: gitlabImageExists,
                    message: "Image Already exists in the database."
                })
            }
            
        } 

    } catch (error) {
        console.log("Failed to get the image from gitlab, server error!")
        return res.status(500).json({
            success: false,
            data: error,
            message: "Failed to get the image from gitlab, server error!"
        })
    }
        
        
}

// @desc    get a specific image from a dockerhub namespace
// @route   POST /api/v1/dockerimages/gitlab_imec/getspecificimage
// @access  Public
exports.getSpecificGitlabImecImage = async (req, res, next) => {

    try {

        const{ pathImage } = req.body
        
        // search the desired gitlab image in the database and return it.
        await infoGitlabImages.findOne({path: pathImage})
            .then(function(message){

                if(message !== null){
                    message['created_at'] = new Date(message.created_at).toString().substr(0,34)
                    return res.status(200).json({
                        success: true,
                        data: message,
                        message: "Succeeded to retrieve information of a specific docker image from Gitlab."
                    }) 
                }
                else{
                    return res.status(400).json({
                        success: true,
                        data: null,
                        message: "Image does not exist in the database."
                    }) 
                }
            })
            .catch(function(error){

                return res.status(400).json({
                    success: true,
                    data: undefined,
                    message: "Failed to retrieve information of a specific docker image from Gitlab."
                }) 
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



// @desc    delete a image from the database
// @route   DELETE /api/v1/dockerimages/gitlab_imec/:image_id
// @access  Public
exports.deleteGitlabImecImageFromDatabase = async (req, res, next) => {
    try {

        // delete a specific GitLab Docker Image in the database
        const deleteGitlabImage = await infoGitlabImages.findOne({image_id: req.params.image_id})

        // image does not exist
        if(deleteGitlabImage === null) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'The image with the given id is not found, so the image is not deleted from the database.'
            })
        }

        // remove the drone from the database
        await deleteGitlabImage.remove();


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