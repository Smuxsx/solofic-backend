const { DataTypes: type, Model } = require('sequelize')
const db = require('../config/db.config')

class PermissionsModel extends Model { }

PermissionsModel.init(
    {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: type.STRING(30),
            allowNull: false,
        },
        description: {
            type: type.STRING(250),
            allowNull: false,
        }
    },
    { sequelize: db, modelName: 'permissions', underscored: true}
)

module.exports = PermissionsModel
