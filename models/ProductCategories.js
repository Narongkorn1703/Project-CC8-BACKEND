module.exports = (sequelize, DataTypes) => {
  const ProductCategories = sequelize.define(
    "ProductCategories",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
  ProductCategories.associate = (models) => {
    ProductCategories.hasMany(models.Products, {
      foreignKey: {
        name: `productCategoriesId`,
        allowNull: false,
        field: `product_categories_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
  };
  return ProductCategories;
};
