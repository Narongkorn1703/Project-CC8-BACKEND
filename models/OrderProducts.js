module.exports = (sequelize, DataTypes) => {
  const OrderProducts = sequelize.define("OrderProducts", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  OrderProducts.associate = (models) => {
    OrderProducts.belongsTo(models.Orders, {
      foreignKey: {
        name: `orderId`,
        allowNull: false,
        field: `order_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });

    OrderProducts.belongsTo(models.Products, {
      foreignKey: {
        name: `productId`,
        allowNull: false,
        field: `product_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
  };
  return OrderProducts;
};
