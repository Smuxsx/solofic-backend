const { DataTypes: type, Model } = require('sequelize')
const db = require('../config/db.config')

class ReviewsModel extends Model { }

ReviewsModel.init (
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
        product_id: {
            type: type.INTEGER,
            allowNull: false,
        },
        rate: {
            type: type.INTEGER,
            allowNull: false,
        },
        comment: {
            type: type.TEXT,
            allowNull: false,
        },
        created_at: {
            type: type.DATETIME,
            allowNull: false,
        },
        updated_at: {
            type: type.DATETIME,
            allowNull: true,
        },
        disabled_at: {
            type: type.DATETIME,
            allowNull: true,
        },
    },
    { sequelize: db, modelName: 'reviews' }
)

module.exports = ReviewsModel
