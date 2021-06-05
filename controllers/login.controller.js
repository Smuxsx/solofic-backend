// login.controller.js
// Imports of express.js
const express = require('express')
const router = express.Router()

// Imports utility functions
const { errorResponse } = require('../utils')

// Validator functions
const { loginUser } = require('../validators')

// Imports services
const { UserService } = require('../services')

router.post('/', async (req, res) => {
    try {
        const {
            username,
            password,
            hasActiveSession,
        } = req.body

        const authentication = await loginUser({
            username,
            password,
            hasActiveSession
        })

        await UserService.login(authentication)
            .then(result => {
                res.send(result)
            })
            .catch(message => {
                errorResponse(
                    'Ha sucedido un problema con su inició de sesión',
                    message
                )
            })
    } catch (message) {
        errorResponse(
            'Ha sucedido un problema con su inició de sesión',
            message
        )
    }
})

module.exports = router