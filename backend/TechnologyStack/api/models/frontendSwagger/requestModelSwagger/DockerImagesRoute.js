const Joi = require('@hapi/joi')


module.exports = {
    0: {
        model: "getNameAllImages", // Name of the model
        group: "Docker Images", // Swagger tag for apis.
        description: "Get the names of all the Docker images that are linked with the platform."
    },
    1: {
        model: "addPublicDockerHubImagesNamespace", // Name of the model
        group: "Docker Images from Docker Hub", // Swagger tag for apis.
        description: "Add all public Docker images from a specific registry on Docker Hub to the database.",
        body: {
            namespace: Joi.string().required(),
        }
    },
    2:{
        model: "getSpecificPublicDockerHubImage", // Name of the model
        group: "Docker Images from Docker Hub", // Swagger tag for apis.
        description: "Get a Docker image (originating from Docker Hub) from the database.",
        body: {
            namespace: Joi.string().required(),
            name: Joi.string().required(),
        }
    },
    3:{
        model: "addSpecificPublicDockerHubImage", // Name of the model
        group: "Docker Images from Docker Hub", // Swagger tag for apis.
        description: "Add a specific public Docker image from Docker Hub to the database.",
        body: {
            namespace: Joi.string().required(),
            nameImage: Joi.string().required(),
        }
    },
    4:{
        model: "deleteDockerHubImageFromDatabase", // Name of the model
        group: "Docker Images from Docker Hub", // Swagger tag for apis.
        description: "Delete a Docker image (originating from Docker Hub) from the database.",
        path: {
            id: Joi.string()
        }
    },
    5:{
        model: "AddSpecificImageFromGitlabImec", // Name of the model
        group: "Docker Images from GitLab", // Swagger tag for apis.
        description: "Add a Docker image (originating from GitLab IMEC) to the database.",
        body: {
            private_token: Joi.string().required(),
            pathImage: Joi.string().required(),
            idProject: Joi.number().required()
        }
    },
    6:{
        model: "getSpecificGitlabImecImage", // Name of the model
        group: "Docker Images from GitLab", // Swagger tag for apis.
        description: "Get a Docker image (originating from GitLab IMEC) from the database.",
        path: {
            pathImage: Joi.string()
        }
    },
    7:{
        model: "deleteGitlabImecImageFromDatabase", // Name of the model
        group: "Docker Images from GitLab", // Swagger tag for apis.
        description: "Delete a Docker image (originating from GitLab IMEC) from the database.",
        path: {
            image_id: Joi.string()
        }
    }
}

