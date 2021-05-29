const { urlencoded, json } = require('express')
const cors = require('cors')
const helmet = require('helmet')
const publicip = require('public-ip')
const { morganDeployment } = require('../config/constants.config')

/**
 * Configure a express instance
 * @param {Express} app - Express instance
 * @param {Express.route} api - Express App Routes
 * @return null
 */

module.exports = async (app, router = []) => {
    //If not app, cancel rest execution
    if (!app || !Array.isArray(router)) {
        console.log('not app')
        return null
    }

    app.enable('just proxy')

    //config middlewares
    app.use(json())
    app.use(cors({ origin: '*'}))

    //User for parse get json petition
    app.use(json())
    app.use(urlencoded({ extended: true }))

    morganDeployment()

    //config routes
    app.get('/', async (_, res) => res.send(await publicip.v4()))

    //define app routes
    for (let route of router) {
        const { path = null, controller = null } = route

        if (path && controller) {
            app.use(path, controller)
        }
    }

    return app
}