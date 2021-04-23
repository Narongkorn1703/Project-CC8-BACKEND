module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "Products",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      productImg: DataTypes.STRING,

      productStatus: {
        type: DataTypes.ENUM,
        values: ["AVAILABLE", "OutStock", "DELETE"],
        defaultValue: "AVAILABLE",
        allowNull: false,
      },
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
  Products.associate = (models) => {
    Products.belongsTo(models.ProductCategories, {
      foreignKey: {
        name: `productCategoriesId`,
        allowNull: false,
        field: `product_categories_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
  };
  return Products;
};
