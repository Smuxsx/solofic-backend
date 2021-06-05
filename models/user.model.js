//user models
const { DataTypes: type, Model } = require('sequelize')
const db = require('../config/db.config')

class UserModel extends Model { }

UserModel.init(
    {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: type.STRING(24),
            unique: true,
            allowNull: false,
        },
        email: {
            type: type.STRING(70),
            unique: true,
            allowNull: false,
        },
        password: {
            type: type.STRING(24),
            allowNull: false,
        },
        status_id: {
            type: type.INTEGER,
            allowNull: false,
        },
        permissions_id: {
            type: type.INTEGER,
            allowNull: false,
        }
    },
    { sequelize: db, modelName: 'users', underscored: true}
)

module.exports = UserModel
