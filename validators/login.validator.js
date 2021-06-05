const Joi = require('joi')
const { validatorErrorMessage } = require('../utils')

const loginUser = function (body) {
    return new Promise((resolve, reject) => {
        const schema = Joi.object({
            username: Joi.string()
                .exist()
                .trim()
                .min(4)
                .max(40)
                .messages({
                    'string.base': 'Ingrese nombre de usuario válido',
                    'string.trim': 'Su nombre de usuario no debe de poseer espacios',
                    'string.min': 'Su nombre de usuario no puede tener menos de 4 carácteres',
                    'string.max': 'Su nombre de usuario no puede exceder los 40 carácteres',
                    'string.empty': 'Es requerido su nombre de usuario',
                    'any.required': 'Es requerido su nombre de usuario',
                }),
            password: Joi.string()
                .exist()
                .min(12)
                .max(24) // new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
                .pattern(new RegExp('^[a-zA-Z0-9,(),-_.,@$%^/\`!?¿¡]{12,24}$')) // (?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}
                .required()
                .messages({
                    'string.base': 'Ingrese su contraseña',
                    'string.min': 'Su contraseña debe poseer 12 carácteres mínimos',
                    'string.max': 'Su contraseña no debe exceder los 24 carácteres',
                    'string.pattern': 'Su contraseña debe poseer un patrón alfanumérico con carácteres especiales',
                    'string.empty': 'Es requerida su contraseña de usuario',
                    'any.required': 'Es requerida su contraseña de usuario',
                }),
            hasActiveSession: Joi.number()
                .exist()
                .integer()
                .min(0)
                .max(1)
                .required()
                .messages({
                    'number.base': 'Debe especificarse si posee correo electrónico, teléfono o ambos',
                    'number.min': 'Este valor no puede representar lo contrario a no tener este campo',
                    'number.max': 'Este valor no puede representar algo distinto a tener el correo'
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

module.exports = loginUser