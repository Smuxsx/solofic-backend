const { DataTypes: type, Model } = require('sequelize')
const db = require('../config/db.config')

class OrdersModel extends Model { }

OrdersModel.init(
    {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        customer_id: {
            type: type.INTEGER,
            allowNull: false,
        },
        order_date: {
            type: type.DATETIME,
            allowNull: false,
        },
        total: {
            type: type.FLOAT,
            allowNull: false,
        },
        status_id: {
            type: type.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: type.DATETIME,
            allowNull: false,
        },
        updated_at: {
            type: type.DATETIME,
            allowNull: false,
        },
        disabled_at: {
            type: type.DATETIME,
            allowNull: false,
        }
    },
    { sequelize: db, modelName: 'orders', underscored: true}
)

module.exports = OrdersModel