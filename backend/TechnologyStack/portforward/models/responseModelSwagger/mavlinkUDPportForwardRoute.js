module.exports = {
    initPortForwardUDPMavlinkMessagesDroneClient: {
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
    initPortForwardUDPMavlinkMessagesClientDrone: {
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
    stopForwardUDPMavlinkMessages: {
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