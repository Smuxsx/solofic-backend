const express = require('express')
const router = express.Router()

const login = require('./login.controller')
const register = require('./register.controller')
const clients = require('./clients.controller')

router
    .use(login)
    .use(register)
    .use(clients)

module.exports = router