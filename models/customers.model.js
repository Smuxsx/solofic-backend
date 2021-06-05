const { DataTypes: type, Model } = require('sequelize')
const db = require('../config/db.config')

class CustomersModel extends Model { }

CustomersModel.init(
    {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        customer_name: {
            type: type.STRING(50),
            allowNull: false,
        },
        adress: {
            type: type.TEXT,
            allowNull: false,
        },
        users_id: {
            type: type.INTEGER,
            allowNull: false,
        },
        phone: {
            type: type.STRING(15),
            allowNull: true,
        },
        credit_card: {
            type: type.STRING(60),
            allowNull: true,
        },
    },
    { sequelize: db, modelName: 'customers'}
)

module.exports = CustomersModel
