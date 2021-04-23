const { Products, ProductCategories } = require("../models");

exports.getAllProduct = async (req, res, next) => {
  const product = await Products.findAll({
    where: { productStatus: "AVAILABLE" },

    include: {
      model: ProductCategories,
      attributes: ["id", "name"],
    },
  });
  res.status(201).json({ product });
};
