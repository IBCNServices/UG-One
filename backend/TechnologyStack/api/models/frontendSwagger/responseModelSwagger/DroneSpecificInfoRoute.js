module.exports = {
    getDroneHardware: {
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
                type: 'object'
            },
            message: {
                type:'string'
            }
        }
    },
    getDroneResources: {
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
                type: 'object'
            },
            message: {
                type:'string'
            }
        }
    },
    configureAndStartMavlinkQGC: {
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
                type: 'object'
            },
            message: {
                type:'string'
            }
        }
    },
    stopMavlinkQGC: {
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
    checkIfDroneIsActive: {
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
    getInfoAllContainersFromDrone: {
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
                type: 'null'
            },
            message: {
                type:'string'
            }
        }
    },
    getInfoSpecificContainerFromDrone: {
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
                type: 'null'
            },
            message: {
                type:'string'
            }
        }
    },
    createNewContainerOnDrone: {
        201: {
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
                type: 'null'
            },
            message: {
                type:'string'
            }
        }
    },
    stopContainerOnDrone: {
        200: {
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
                type: 'null'
            },
            message: {
                type:'string'
            }
        }
    },
    deleteContainerOnDrone: {
        200: {
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
    restartContainerOnDrone: {
        200: {
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
                type: 'null'
            },
            message: {
                type:'string'
            }
        }
    },
    dockerSystemPruneOnDrone: {
        200: {
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
                type: 'null'
            },
            message: {
                type:'string'
            }
        }
    },
    getInfoAllImagesFromDrone: {
        200: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'array'
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
                type: 'null'
            },
            message: {
                type:'string'
            }
        }
    },
    getInfoSpecificImageFromDrone: {
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
    deleteImageOnDrone: {
        200: {
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
                type: 'null'
            },
            message: {
                type:'string'
            }
        }
    },
}