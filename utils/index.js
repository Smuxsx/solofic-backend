const path = require("path")
const jwt = require("jsonwebtoken")
const log = require("../config/logs.config")

/**
 * @author CosmicTiger - Luisangel Marcia
 * @description Method that was taught by my master Harold Espinoza,
 * it generates an authentication token through jwt package
 * @param {Object} data - Data to encrypt
 * @param {String} salt - Secret Key in which the data would get encrypted
 * @param {Object} options - options for the token when the data got encrypted
 * @returns {String<jwt.Data>} token
 */
const createAccessToken = function (data, salt, options = {}) {
    return new Promise((resolve, reject) => {
        jwt.sign(data, salt, options, (error, token) => {
            if (error) {
                reject(error)
            }

            resolve(token)
        })
    })
}

/**
 * @author CosmicTiger - Luisangel Marcia
 * @description Method that was taught by my master Harold Espinoza,
 * it builds a json with an error structure for response of a promise,
 * at the same time it register the error in the logs files in which is required to be manipulated.
 * @param {String} errorMessage - error message to show in the response by argument from the promise
 * @param {String} errorOriginal - error message that is ocurred inside the execution stack of Javascript
 * @returns {Object} errorObject
 */
const errorResponse = function (
    errorMessage = 'error',
    errorOriginal = null
) {
    const { 2: stack } = new Error().stack.split('\n')
    const StackFile = stack.slice(
        stack.lastIndexOf('(') + 1,
        stack.lastIndexOf('.js') + 3
    )

    const filename = path.basename(StackFile)

    log(
        `${filename} | ${errorMessage} ${errorOriginal ? '| ' + errorOriginal : ''
        }`
    )

    return {
        error: true,
        message: errorMessage,
    }
}
/**
 * @author CosmicTiger - Luisangel Marcia
 * @description Method that was taught by my master Harold Espinoza,
 * extract error message from JoiError and return cleaned message Error
 * @param {Object<Joi.Error>} JoiError - Error object provided for Joi Schema Validation
 * @returns {String} finalMessage
 */
const validatorErrorMessage = function (JoiError) {
    if (Object.prototype.toString.call(JoiError) !== '[object Error]') {
        throw String(
            'ValidationErrorMessage: Param value is not a valid JoiError'
        )
    }

    // get base Joi error message
    const errorMessage = String(JoiError)
    // regex to remove the beginning of the Joi Error Message
    const toReplaceRegex = /^(validationerror: )/gi
    const toReplaceRegexSecondary = /^(Error: )/gi

    const finalMessage = errorMessage
        .replace(toReplaceRegex, '')
        .replace(toReplaceRegexSecondary, '')

    return finalMessage

}

module.exports = {
    createAccessToken,
    errorResponse,
    validatorErrorMessage,
}
