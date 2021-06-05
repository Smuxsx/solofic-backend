const { DataTypes: type, Model } = require('sequelize')
const db = require('../config/db.config')

class ShipmentsModel extends Model { }

ShipmentsModel.init(
    {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order_id: {
            type: type.INTEGER,
            allowNull: true,
        },
        status_id: {
            type: type.INTEGER,
            allowNull: false,
        },
        shipment_date: {
            type: type.DATETIME,
            allowNull: false,
        }
    },
    { sequelize: db, modelName: 'status'}
)

module.exports = ShipmentsModel
