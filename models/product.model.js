const { DataTypes: type, Model } = require('sequelize')
const db = require('../config/db.config')

class ProductModel extends Model { }

ProductModel.init(
    {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: type.STRING(60),
            allowNull: false,
        },
        type_id: {
            type: type.INTEGER,
            allowNull: false,
        },
        price: {
            type: type.FLOAT,
            allowNull: false,
        },
        status_id: {
            type: type.INTEGER,
            allowNull: false,
        }
    },
    { sequelize: db, modelName: 'product', underscored: true}
)

module.exports = ProductModel