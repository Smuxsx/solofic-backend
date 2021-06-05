const { DataTypes: type, Model } = require('sequelize')
const db = require('../config/db.config')

class ProductTypeModel extends Model { }

ProductType.init(
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
    { sequelize: db, modelName: 'product_type', underscored: true}
)

module.exports = ProductType
