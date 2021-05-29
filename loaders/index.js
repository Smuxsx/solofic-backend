const expressLoader = require('./express.loader')
const sequelizeLoader = require('./sequelize.loader')

module.exports = {
    async init ({
        expressApp = null,
        expressRoutes = null,
        sequelizeInstancee,
    }) {
        await expressLoader(expressApp, expressRoutes)
        await sequelizeLoader(sequelizeInstance)
    },
}
