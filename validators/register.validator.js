// register.validator.js
// Import of Joi
const Joi = require('joi')
// Imports of constants
const { constants } = require('../config')
// Imports of utils functions
const { validatorErrorMessage } = require('../utils')

const registerUser = function (body) {
    const { TLDS } = constants

    const TLDS_ARRAY = TLDS.map(item => item.name)

    return new Promise((resolve, reject) => {
        const schema = Joi.object({
            username: Joi.string()
                .exist()
                .min(4)
                .max(40)
                .required()
                .messages({
                    'string.base': 'Ingrese nombre de usuario válido',
                    'string.min': 'Su nombre de usuario no puede tener menos de 4 carácteres',
                    'string.max': 'Su nombre de usuario no puede exceder los 100 carácteres',
                    'string.empty': 'Es requerido su nombre de usuario',
                    'any.required': 'Es requerido su nombre de usuario',
                }),
            password: Joi.string()
                .exist()
                .min(8)
                .max(24) // new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
                .pattern(new RegExp('^[a-zA-Z0-9,(),-_.,@$%^/\`!?¿¡]{8,24}$')) // (?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}
                .required()
                .messages({
                    'string.base': 'Ingrese su contraseña',
                    'string.min': 'Su contraseña debe poseer 12 carácteres mínimos',
                    'string.max': 'Su contraseña no debe exceder los 24 carácteres',
                    'string.pattern': 'Su contraseña debe poseer un patrón alfanumérico con carácteres especiales',
                    'string.empty': 'Es requerida su contraseña de usuario',
                    'any.required': 'Es requerida su contraseña de usuario',
                }),
            confirmPassword: Joi.string()
                .exist()
                .valid(Joi.ref('password'))
                .empty()
                .required()
                .messages({
                    'string.base': 'Ingrese su contraseña',
                    'string.ref': 'Su confirmación de contraseña debe de coincidir con la escrita anteriormente',
                    'string.emtpy': 'Es requerido que confirme su contraseña',
                    'any.required': 'Es requerido que confirme su contraseña',
                }),
            hasInfoId: Joi.number()
                .exist()
                .integer()
                .min(1)
                .max(3)
                .messages({
                    'number.base': 'Debe especificarse si posee correo electrónico, teléfono o ambos',
                    'number.min': 'Este valor no puede representar lo contrario a no tener este campo',
                    'number.max': 'Este valor no puede representar algo distinto a tener el correo'
                }),
            firstName: Joi.string()
                .exist()
                .required()
                .messages({
                    'string.base': 'Debe de ingresar su primer nombre',
                    'string.empty': 'Debe de ingresar su primer nombre',
                    'any.required': 'Debe de ingresar su primer nombre'
                }),
            midName: Joi.string()
                .optional()
                .allow('')
                .disallow(Joi.ref('firstName'))
                .messages({
                    'string.base': 'Debe de ingresar su segundo nombre válido',
                    'any.invalid': 'Su segundo nombre no puede ser igual al primero'
                }),
            lastName: Joi.string()
                .exist()
                .required()
                .messages({
                    'string.base': 'Debe de ingresar su primer apellido',
                    'string.empty': 'Debe de ingresar su primer apellido',
                    'any.required': 'Debe de ingresar su primer apellido'
                }),
            secondaryLastName: Joi.string()
                .optional()
                .allow('')
                .messages({
                    'string.base': 'Debe de ingresar su segundo apellido válido',
                }),
            nationalId: Joi.string()
                .exist()
                .length(16)
                .pattern(new RegExp('^[0-9]{3}-[0-9]{6}-[0-9]{4}[A-Z]+$'))
                .required()
                .messages({
                    'string.base': 'Debe de ingresar su cédula de identidad',
                    'string.length': 'Ingrese una cédula válida de longitud',
                    'string.pattern.base': 'Ingrese una cédula válida a los patrones de cédula del país',
                    'any.required': 'Debe de ingresar su cédula de identidad'
                }),
            email: Joi.string()
                .allow('')
                .email({
                    minDomainSegments: 2,
                    tlds: {
                        allow: TLDS_ARRAY,
                    }
                })
                .required()
                .messages({
                    'string.base': 'Ingrese su correo electrónico',
                    'string.email': 'Su email debe de ser un email válido conocido',
                    'string.empty': 'Es requerido su correo electrónico',
                    'any.optional': 'Se requiere de correo opcionalmente',
                }),
            phone: Joi.string()
                .optional()
                .allow('')
                .length(10)
                .pattern(/^[0-9]+$/)
                .messages({
                    'string.base': 'Su número de teléfono no es válido',
                    'string.length': 'Su número de teléfono no es procedente de Nicaragua',
                    'string.pattern.base': 'Su número de teléfono no es válido'
                }),
            address: Joi.string()
                .min(20)
                .max(255)
                .required()
                .messages({
                    'string.base': 'Debe de ingresar su dirección de referencia',
                    'string.min': 'Su dirección de referencia debe poseer mejor descripción',
                    'string.max': 'Su dirección de referencia posee una descripción compleja, trate de resumir',
                    'any.required': 'Debe de ingresar su dirección de referencia'
                }),
        })

        const { error, value } = schema.validate(body)

        if (error) {
            reject(
                validatorErrorMessage(error)
            )
        }

        resolve(value)
    })
}

module.exports = registerUser