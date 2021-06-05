//sequelize loader

const {
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
} = require ('../models')

module.exports = async function (sequelizeInstance) {
    if (!sequelizeInstance || !sequelizeInstance.sync) {
        return
    }

    // PermissionsModel relationships
    PermissionsModel.belongsTo(UserModel, { foreignKey: 'permissions_id' })

    // StatusModel relationships
    StatusModel.belongsTo(UserModel, { foreignKey: 'status_id' })

    // UserModel relationships
    UserModel.hasOne(PermissionsModel, { foreignKey: 'permissions_id' })
    UserModel.hasOne(StatusModel, { foreignKey: 'status_id' })

    //StatusModel relationships
    StatusModel.belongsTo(ShipmentsModel, { foreignKey: 'status_id'})
    StatusModel.belongsTo(OrdersModel, { foreignKey: 'status_id'})
    StatusModel.hasOne(ProductModel, { foreignKey: 'status_id'})
    StatusModel.hasOne(UserModel, { foreignKey: 'status_id'})

    //ProductModel relationships
    ProductModel.belongsTo(ReviewsModel, { foreignKey: 'product_id'})
    ProductModel.belongsTo(OrderDetailsModel, { foreignKey: 'product_id'})
    ProductModel.hasOne(ProductTypeModel, { foreignKey: 'type_id'})
    ProductModel.hasOne(StatusModel, { foreignKey: 'status_id'})

    //ProductTypeModel relationships
    ProductTypeModel.belongsTo(ProductModel, { foreignKey: 'type_id'})

    //ShipmentsModel relationships
    ShipmentsModel.hasOne(StatusModel, { foreignKey: 'status_id'})
    ShipmentsModel.hasOne(OrdersModel, { foreignKey: 'order_id'})

    //OrderDetailsModel relationships
    OrderDetailsModel.hasOne(OrdersModel, { foreignKey: 'order_id'})
    OrderDetailsModel.hasOne(ProductModel, { foreignKey: 'product_id'})
    
    //OrdersModel relationships
    OrdersModel.belongsTo(OrderDetailsModel, { foreignKey: 'order_id'})
    OrdersModel.belongsTo(ShipmentsModel, { foreignKey: 'order_id'})
    OrdersModel.hasOne(CustomersModel, { foreignKey: 'customer_id'})
    OrdersModel.hasOne(StatusModel, { foreignKey: 'status_id'})

    //CustomersModel relationships
    CustomersModel.belongsTo(ReviewsModel, { foreignKey: 'customer_id'})
    CustomersModel.belongsTo(OrdersModel, { foreignKey: 'customer_id'})
    CustomersModel.hasOne(UserModel, { foreignKey: 'users_id'})

    //ReviewsModel relationships
    ReviewsModel.hasOne(CustomersModel, { foreignKey: 'customer_id'})
    ReviewsModel.hasOne(OrderDetailsModel, { foreignKey: 'product_id'})

    await sequelizeInstance.sync({ alter: false})

    return sequelizeInstance
}
