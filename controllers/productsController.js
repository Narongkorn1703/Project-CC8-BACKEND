const { Products, ProductCategories } = require("../models");
const { Op } = require("sequelize");
exports.getByKeywordUser = async (req, res, next) => {
  const { keyword } = req.query;
  console.log(keyword);
  const products = await Products.findAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          amount: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          price: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ],
      [Op.not]: {
        product_status: "DELETE",
      },
    },
    include: {
      model: ProductCategories,
      attributes: ["id", "name"],
    },
  });
  res.status(200).json({ products });
};
exports.getProductsByType = async (req, res, next) => {
  const { keyword } = req.query;
  console.log(keyword);
  const productCate = await ProductCategories.findAll({
    include: {
      model: Products,

      [Op.not]: {
        product_status: "DELETE",
      },
    },
    where: {
      name: {
        [Op.like]: `%${keyword}%`,
      },
    },
  });
  res.status(200).json({ productCate });
};
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
