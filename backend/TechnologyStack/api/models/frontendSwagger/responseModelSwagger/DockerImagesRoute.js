module.exports = {
    getNameAllImages: {
        200: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'object'
            },
            message: {
                type:'string'
            }
        },
        500: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'object'
            },
            message: {
                type:'string'
            }
        }
    },
    addPublicDockerHubImagesNamespace: {
        201: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'object'
            },
            message: {
                type:'string'
            }
        },
        500: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'null'
            },
            message: {
                type:'string'
            }
        }
    },
    getSpecificPublicDockerHubImage: {
        200: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'object'
            },
            message: {
                type:'string'
            }
        },
        500: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'null'
            },
            message: {
                type:'string'
            }
        }
    },
    addSpecificPublicDockerHubImage: {
        200: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'object'
            },
            message: {
                type:'string'
            }
        },
        201: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'object'
            },
            message: {
                type:'string'
            }
        },
        500: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'null'
            },
            message: {
                type:'string'
            }
        }
    },
    deleteDockerHubImageFromDatabase: {
        200: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'object'
            },
            message: {
                type:'string'
            }
        },
        404: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'null'
            },
            message: {
                type:'string'
            }
        },
        500: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'null'
            },
            message: {
                type:'string'
            }
        }
    },
    AddSpecificImageFromGitlabImec: {
        200: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'object'
            },
            message: {
                type:'string'
            }
        },
        400: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'object'
            },
            message: {
                type:'string'
            }
        },
        500: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'object'
            },
            message: {
                type:'string'
            }
        }
    },
    getSpecificGitlabImecImage: {
        200: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'object'
            },
            message: {
                type:'string'
            }
        },
        400: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'null'
            },
            message: {
                type:'string'
            }
        },
        500: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'null'
            },
            message: {
                type:'string'
            }
        }
    },
    deleteGitlabImecImageFromDatabase: {
        200: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'object'
            },
            message: {
                type:'string'
            }
        },
        404: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'null'
            },
            message: {
                type:'string'
            }
        },
        500: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'null'
            },
            message: {
                type:'string'
            }
        }
    },
}