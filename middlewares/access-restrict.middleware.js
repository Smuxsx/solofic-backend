const { constants } = require('../config')
const { errorResponse } = constants

const errorRoleMessage = 'No tienes permisos para realizar la acción solicitada'

module.exports = {
    /**
     * Restringe el acceso a un usuario según un rol establecido
     * @param {Number|Array} RoleToRestrict - Rol a restringir
     */
    restrictAccessTo(...roleToRestrict) {
        return (req, res, next) => {
            try {
                const { role } = req.user

                // check if adminUser role exist into exclude list
                if (!role || roleToRestrict.indexOf(role) !== -1) {
                    throw String(errorRoleMessage)
                }

                next()
            } catch (message) {
                return res.status(401).json(
                    errorResponse(
                        `restrict.middleware.js | error in user role verification | ${message}`
                    )
                )
            }
        }
    },

    /**
     * Permite el acceso a un adminUser según un rol establecido
     * @param {Number|Array} AdminRoleToaccess - Rol a permitir
     */
    onlyAccessTo(...roleToAccess) {
        return (req, res, next) => {
            try {
                const { role } = req.user

                // check if adminUser role exist into permission list
                if (!role || roleToAccess.indexOf(role) === -1) {
                    throw String(errorRoleMessage)
                }

                next()
            } catch (message) {
                log(
                    `restrict.middleware.js | error in role verification | ${message}`
                )

                return res.status(401).json({
                    error: true,
                    message,
                })
            }
        }
    },
    /**
     * Restringe el acceso a un adminUser según un rol establecido
     * @param {Number|Array} AdminRoleToRestrict - Rol a restringir
     */
    adminRestrictAccessTo(...AdminRoleToRestrict) {
        return (req, res, next) => {
            try {
                const { role } = req.admin

                // check if adminUser role exist into exclude list
                if (!role || AdminRoleToRestrict.indexOf(role) !== -1) {
                    throw String(errorRoleMessage)
                }

                next()
            } catch (message) {
                log(
                    `restrict.middleware.js | error in role verification | ${message}`
                )

                return res.status(401).json({
                    error: true,
                    message,
                })
            }
        }
    },

    /**
     * Permite el acceso a un adminUser según un rol establecido
     * @param {Number|Array} AdminRoleToaccess - Rol a permitir
     */
    adminOnlyAccessTo(...AdminRoleToAccess) {
        return (req, res, next) => {
            try {
                const { role } = req.admin

                // check if adminUser role exist into permission list
                if (!role || AdminRoleToAccess.indexOf(role) === -1) {
                    throw String(errorRoleMessage)
                }

                next()
            } catch (message) {
                log(
                    `restrict.middleware.js | error in role verification | ${message}`
                )

                return res.status(401).json({
                    error: true,
                    message,
                })
            }
        }
    },
}