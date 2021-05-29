// vars.config.js
// import from thirdpartylibraries
const dotenv = require('dotenv')
// var for database
const DB_DIALECT = 'mysql'

// validates the moment of execution for the project through .env file
if ( process.env.NODE_ENV !== 'production') dotenv.config()

const {
    DB_NAME,
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    JWT_SECRET,
    PASSWORD_SECRET,
    JWT_SECRET_ADMIN,
    PORT,
} = process.env

module.exports = {
    PORT: PORT || 8080,
    PASSWORD_SECRET: PASSWORD_SECRET || 'secret',
    JWT_SECRET: JWT_SECRET || 'secret',
    JWT_SECRET_ADMIN: JWT_SECRET_ADMIN || 'secret',
    DB: {
        NAME: DB_NAME,
        HOST: DB_HOST || 'localhost',
        USERNAME: DB_USERNAME,
        PASSWORD: DB_PASSWORD,
        DIALECT: DB_DIALECT,
    },
    PRODUCTION: process.env.NODE_ENV === 'production',

}
