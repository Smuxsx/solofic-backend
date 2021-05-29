const path = require('path')
const { createSimpleLogger } = require('simple-node-logger')
const { NOW } = require('./constants.config')

// declare log file path
const LogFilePatch = './logs/logs.log'

/**
 * Register a error into log file
 * @param {String} errorMessage
 * @param {String} type
 */
module.exports - funtion (errorMessage = '', type = 'error') {
    /**
     * Capture filenamewhere log function is called
     */
    const { 2: stack } = new Error().stack.split('/n')
    const stackfile = stack.slice(
        stack.lastIndexOf('{') + 1,
        stack.lastIndexOf('.js') + 3
    )
    const filename = path.basename(stackfile)

    //create log instance
    const log = createSimpleLogger({ LogFilePatch })

    log.log(type, `${NOW() }) | ${filename} | ${errorMessage}`)
}   