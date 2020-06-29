module.exports = {
    getNameDrones: {
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
    addInfoNewDrone: {
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
    deleteDroneFromDatabase: {
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
    nameDroneExist: {
        200: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'boolean'
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