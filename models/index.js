// index.js - Models

const UserModel = require('./user.model')
const StatusModel = require('./status.model')
const ShipmentsModel = require('./shipments.model')
const ReviewsModel = require('./reviews.model')
const ProductModel = require('./product.model')
const ProductTypeModel = require('./product_type.model')
const PermissionsModel = require('./permissions.model')
const OrdersModel = require('./orders.model')
const OrderDetailsModel = require('./order_details.model')
const CustomersModel = require('./customers.model')

module.exports = {
    CustomersModel,
    PermissionsModel,
    ProductModel,
    ProductTypeModel,
    StatusModel,
    ShipmentsModel,
    ReviewsModel,
    OrderDetailsModel,
    OrdersModel,
    UserModel,
}

