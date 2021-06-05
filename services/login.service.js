// login.service.js
// Imports 3rd party libraries
const moment = require('moment')

const {
    generateRandomKey,
    encodePassword,
    NOW,
} = require('../config/constants.config')
const { JWT_SECRET, PASSWORD_SECRET } = require('../config/vars.config')
const { UserModel, HasInfoModel, UserPermissionsModel, InformationUsersModel } = require('../models')

const {
    createAccessToken,
    errorResponse,
} = require('../utils')

const LoginService = {}

LoginService.loginUser = function (email, password, web) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!email || !password) {
                throw String('Invalid input data')
            }

            // We obtained the connected users of our Redux NodeJS state
            const { activeUsers } = store.getState()

            // The hash of the password is created
            const passwordEncrypted = encodePassword(
                password,
                PASSWORD_SECRET
            )

            const resultUser = await UserModel.findOne({
                where: {
                    email: email,
                    password: passwordEncrypted,
                    status_id: 1,
                },
                include: [
                    {
                        model: InformationUsersModel,
                        as: 'information_users',
                    }
                ],
                nest: true,
                raw: true,
            })

            if (!resultUser) {
                reject(
                    errorResponse(
                        'Tus credenciales son incorrectas',
                        'LoginService.loginUser'
                    )
                )
                return
            }

            // Password and other types of fields get removed from the auth
            delete result.password
            delete result.created_at
            delete result.modified_at
            delete result.delete_at

            let loggedWith = null

            if (result.has_email) {
                const has_info = await HasInfoModel.findByPk(result.has_email)
                loggedWith = has_info.name


            }

            if (result.has_phone) {
                const has_info = await HasInfoModel.findByPk(result.has_phone)
                loggedWith = has_info.name
            }

            const role = await UserPermissionsModel.findByPk(result.permission_id)

            const toEncrypt = {
                id: result.id,
                username: result.username,
                loggedWith: loggedWith,
                role: role,
                session: await generateRandomKey(),
            }

            resolve({
                ...result,
                token,
                logged: null,
            })
        } catch (error) {
            reject(
                errorResponse(
                    'Error al iniciar sesión con su credi usuario',
                    error
                )
            )
        }
    })
}

module.exports = LoginService