// auth.middleware.js
const log = require('../config/logs.config')

const {
    decodeUserToken,
    decodeAdminToken,
    decodeMixedToken
} = require('../config/constants.config')

const {
    JWT_SECRET_ADMIN,
    JWT_SECRET
} = require('../config/vars.config')

module.exports = {
    auth: async (req, res, next) => {
        const token = req.header('x-auth-token')

        try {
            req.user = await decodeUserToken(token)
            next()
        } catch (error) {
            log(`auth.middleware.js - error en token de autenticación | ${error}`)

            return res.status(401).json({
                error: true,
                message: String('Tu sesión ha caducado'),
            })
        }
    },

    authRoot: async (req, res, next) => {
        const token = req.header('x-auth-token')

        try {
            req.user = await decodeAdminToken(token)
            next()
        } catch (error) {
            log(`auth.middleware.js - error en token de autenticación | ${error}`)

            return res.status(401).json({
                error: true,
                message: error.toString(),
            })
        }
    }
}