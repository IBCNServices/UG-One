const express = require('express');
const router = express.Router();
const { addPublicDockerHubImagesNamespace , addSpecificPublicDockerHubImage, getSpecificPublicDockerHubImage,  deleteDockerHubImageFromDatabase} = require('../../controllers/frontend/docker_images/imageDockerHubImagesController');
const { AddSpecificImageFromGitlabImec, getSpecificGitlabImecImage, deleteGitlabImecImageFromDatabase } = require("../../controllers/frontend/docker_images/imageGitlabImagesController")
const { getNameAllImages } = require('../../controllers/frontend/docker_images/imageMainImagesController')

// retrieve the basic information of the drone
router
    .route('/')
    .get(getNameAllImages)

//routes for images docker hub
router
    .route('/docker_hub/addpublicimagesfromnamespace')
    .post(addPublicDockerHubImagesNamespace)

router
    .route('/docker_hub/getspecificpublicimage')
    .post(getSpecificPublicDockerHubImage)

router
    .route('/docker_hub/addspecificpublicimage')
    .post(addSpecificPublicDockerHubImage)

router
    .route('/docker_hub/:id')
    .delete(deleteDockerHubImageFromDatabase)

// routes from images gitlab
router
    .route('/gitlab_imec/addspecificimage')
    .post(AddSpecificImageFromGitlabImec)

router
    .route('/gitlab_imec/getspecificimage')
    .post(getSpecificGitlabImecImage)

router
    .route('/gitlab_imec/:image_id')
    .delete(deleteGitlabImecImageFromDatabase)
    

module.exports = router;