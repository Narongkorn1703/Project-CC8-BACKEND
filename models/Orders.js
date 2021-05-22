module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define(
    "Orders",
    {
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      paymentStatus: {
        type: DataTypes.ENUM,
        values: ["PENDING", "CONFIRMED", "REJECT"],
        allowNull: false,
      },
      dateTime: DataTypes.DATE,
      slipImgUrl: DataTypes.STRING,
      namePayment: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );
  Orders.associate = (models) => {
    Orders.belongsTo(models.Users, {
      foreignKey: {
        name: `userId`,
        allowNull: false,
        field: `user_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
    Orders.hasMany(models.OrderProducts, {
      foreignKey: {
        name: `orderId`,
        allowNull: false,
        field: `order_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
  };
  return Orders;
};
