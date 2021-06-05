const login = require('../controllers/login.controller')
const register = require('../controllers/register.controller')

const ApiRoutes = [
    { path: '/login', controller: login },
    { path: '/register', controller: register },
]

module.exports = ApiRoutes