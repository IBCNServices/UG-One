// methods for getting the docker images

const infoDockerHubImages = require('../../../models/modelsMongoDB/DockerHubImagesModel');
const infoGitlabImages = require('../../../models/modelsMongoDB/GitlabImagesModel');


// @desc    get all the names and info of all the images(GitLab and Docker Hub) in the database
// @route   GET /api/v1/dockerimages
// @access  Public
exports.getNameAllImages = async (req, res, next) => {
    

    try {
        const allImagesDockerhub = await infoDockerHubImages.find({});
        const allImagesGitlab = await infoGitlabImages.find({});

        sendDataBackAllImages = {
            dockerhub: allImagesDockerhub,
            gitlab: allImagesGitlab
        }


        return res.status(200).json({
            success: true,
            data: sendDataBackAllImages,
            message: "Get all the names of the images."
        })
    } catch (error) {
        console.log("Failed to get all images names from the database, server error!")

        return res.status(500).json({
            success: false,
            data: error,
            message: "Failed to get all images names from the database, server error!"
        })
    }
}
