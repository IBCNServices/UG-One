module.exports = {
    getNameDrones: {
        200: {
            succes: {
                type: 'boolean'
            },
            data: {
                type: 'number'
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
}