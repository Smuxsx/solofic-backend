// user.service.js
// Import sequelize
const { col } = require('sequelize')

// Import middlewares
const jwt = require('jsonwebtoken')
const _ = require('lodash')

// Import config functions
const { encodePassword, NOW } = require('../config/constants.config')
const { JWT_SECRET, JWT_SECRET_ADMIN, PASSWORD_SECRET } = require('../config/vars.config')

// Import utils
const { errorResponse } = require('../utils')

// Import models
const {
    UserModel,
    UserAddressModel,
    UserPermissionsModel,
    HasInfoModel,
    InformationUsersModel
} = require('../models')

const UserService = {}

UserService.register = function ({
    username,
    password,
    hasInfoId,
    firstName,
    midName = null,
    lastName,
    secondaryLastName = null,
    nationalId,
    email,
    phone,
    address
}) {
    return new Promise(async (resolve, reject) => {
        try {

            // To utils in an encrypting algorithm applying Lucipher method of encryption
            const encryptedPassword = encodePassword(password, PASSWORD_SECRET)

            const userRegistration = await UserModel.create({
                username,
                password: encryptedPassword,
                has_info_id: hasInfoId,
                permission_id: 2,
                status_id: 1,
                created_at: NOW(),
            })

            const user_id = userRegistration.get('id')

            if (!user_id) {
                throw String('El usuario no ha logrado crearse')
            }

            const infoRelatedToRegistratedUser = await InformationUsersModel.create({
                user_id,
                first_name: firstName,
                mid_name: midName,
                last_name: lastName,
                secondary_last_name: secondaryLastName,
                national_id: nationalId,
                email: email || null,
                phone: phone || null,
                created_at: NOW()
            })

            const addressToRelatedUser = await UserAddressModel.create({
                user_id,
                status_id: 1,
                personal_reference: address,
                created_at: NOW()
            })

            if (!infoRelatedToRegistratedUser && !addressToRelatedUser) {
                await UserModel.delete({
                    where: { id: user_id }
                })
                    .then(_ => {
                        resolve({
                            response: 'warning',
                            message: 'Usuario no pudo crearse por algún error en el servicio'
                        })
                    })
                    .catch(error => {
                        errorResponse(
                            'No se pudo revocar inserción de usuario por mal proceso',
                            error
                        )
                    })
            }

            resolve({
                response: 'success',
                message: 'Su credi usuario administrador ha sido creado con éxito'
            })

        } catch (error) {
            reject(
                errorResponse(
                    'Sucedio un error durante el proceso de registro',
                    `UserService.registerAdmin: ${error}`
                )
            )
        }
    })
}

UserService.login = function ({
    username,
    password,
    hasActiveSession
}) {
    return new Promise(async (resolve, reject) => {
        try {
            const encryptedPassword = encodePassword(password, PASSWORD_SECRET).toString()

            const data = await UserModel.findOne({
                where: {
                    username: username,
                    password: encryptedPassword,
                },
                include: [
                    {
                        model: InformationUsersModel,
                        attributes: [],
                    },
                    {
                        model: UserAddressModel,
                        attributes: [],
                    },
                    {
                        model: UserPermissionsModel,
                        attributes: [],
                    },
                    {
                        model: HasInfoModel,
                        attributes: [],
                    }
                ],
                attributes: [
                    'id',
                    'username',
                    [col('information_user.first_name'), 'first_name'],
                    [col('information_user.mid_name'), 'mid_name'],
                    [col('information_user.last_name'), 'last_name'],
                    [col('information_user.secondary_last_name'), 'secondary_last_name'],
                    [col('information_user.national_id'), 'national_id'],
                    [col('information_user.email'), 'email'],
                    [col('information_user.phone'), 'phone'],
                    [col('user_addresses.personal_reference'), 'address'],
                    [col('user_permission.id'), 'role'],
                    [col('has_info.id'), 'info_type']
                ],
                raw: true,
                nest: true,
            })

            if (!data) {
                throw String('Contraseña no coincide, vuelva a intentarlo')
            }

            jwt.sign(
                { ...data },
                JWT_SECRET_ADMIN,
                hasActiveSession ? { expiresIn: 3600 } : {},
                (err, token) => {
                    // Verify if there's any error when token is generated
                    if (err) {
                        throw String(err.message)
                    }
                    else {
                        resolve({
                            ...data,
                            token,
                        })
                    }
                }
            )
        } catch (error) {
            reject(
                errorResponse(
                    'Error al iniciar sesión de credi usuario',
                    error
                )
            )
        }
    })
}

module.exports = UserService