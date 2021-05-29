// db.config.js
// import from core
const { Sequelize } = require('sequelize')
// import from vars.config.js 
const { DB: dbConfig } = require('./vars.config')

/**
 * Make a sequelize instance
 * @param {String} username - database user
 * @param {String} password - database password
 * @param {String} database - database name
 * @param {String} host - database server host
 * @param {String} logging - database cancelation for cli messages from db server
 * @param {String} dialect - database type
 * @param {Object} pool - database pool connection
 * @param {Object} define - database definition for models
 */
module.exports = new Sequelize(dbConfig.NAME, dbConfig.USERNAME, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    define: {
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
})

