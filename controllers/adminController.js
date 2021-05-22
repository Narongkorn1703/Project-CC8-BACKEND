const {
  Products,
  Orders,
  OrderProducts,
  Users,
  ProductCategories,
} = require("../models");
const { Op } = require("sequelize");

exports.addProduct = async (req, res, next) => {
  const { name, categories, amount, price } = req.body;
  console.log(req.imgUrl);
  console.log(req.body);
  const { role } = req.users;

  if (role !== "ADMIN") {
    return res.status(400).json({ message: "You are unauthorize" });
  }
  const product = await Products.create({
    name,
    amount,
    price,
    productImg: req.imgUrl,
    productCategoriesId: categories,
  });
  res.status(201).json({ message: "Added", product });
};
exports.getAllProduct = async (req, res, next) => {
  const { role } = req.users;

  if (role !== "ADMIN") {
    return res.status(400).json({ message: "You are unauthorize" });
  }
  const product = await Products.findAll({
    include: {
      model: ProductCategories,
    },
    order: ["productStatus"],
  });
  res.status(201).json({ product });
};
exports.getByKeyword = async (req, res, next) => {
  const { role } = req.users;

  if (role !== "ADMIN") {
    return res.status(400).json({ message: "You are unauthorize" });
  }
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
        {
          product_status: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ],
    },
    include: {
      model: ProductCategories,
    },
  });
  res.status(200).json({ products });
};
exports.getAllKeywordPayment = async (req, res, next) => {
  const { role } = req.users;
  const { keyword } = req.query;
  if (role !== "ADMIN")
    return res.status(400).json({ message: "You are unauthorize" });
  const orders = await Orders.findAll({
    include: [
      {
        model: OrderProducts,

        attributes: ["id", "quantity", "orderId", "productId"],
      },
      {
        model: Users,
        attributes: ["id", "email", "firstName", "lastName"],
      },
    ],
    attributes: [
      "id",
      "totalPrice",
      "paymentStatus",
      "dateTime",
      "slipImgUrl",
    ],
    where: {
      [Op.or]: [
        {
          paymentStatus: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          id: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          totalPrice: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          namePayment: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ],
    },

    order: ["paymentStatus"],
  });

  res.status(201).json(orders);
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.users;
  if (role !== "ADMIN") {
    return res.status(401).json({ message: "You are unauthorize" });
  }
  const product = await Products.findOne({
    include: {
      model: ProductCategories,
    },
    where: { id },
  });

  res.status(201).json(product);
};
exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    productCategoriesId,
    amount,
    price,

    productStatus,
  } = req.body;
  const { role } = req.users;
  if (role !== "ADMIN") {
    return res.status(401).json({ message: "You are unauthorize" });
  }
  try {
    await Products.update(
      {
        name,
        productCategoriesId,
        amount,
        price,
        productImg: req.imgUrl,
        productStatus,
      },
      { where: { id } }
    );
    const UDproduct = await Products.findOne({ where: { id } });
    res.status(200).json({ UDproduct });
  } catch (err) {
    console.log(err);
  }
};
exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  const { role } = req.users;

  if (role !== "ADMIN")
    return res.status(400).json({ message: "You are unauthorize" });

  await Products.update(
    { productStatus: "DELETE" },
    { where: { id } }
  );
  const DeleteProduct = await Products.findOne({ where: { id } });
  res.status(204).json({ DeleteProduct });
};
exports.getAllPayment = async (req, res, next) => {
  const { id, role } = req.users;
  if (role !== "ADMIN")
    return res.status(400).json({ message: "You are unauthorize" });

  const orders = await Orders.findAll({
    attributes: [
      "id",
      "totalPrice",
      "paymentStatus",
      "dateTime",
      "slipImgUrl",
      "namePayment",
    ],

    include: [
      {
        model: OrderProducts,
        attributes: ["id", "quantity", "orderId", "productId"],
        include: {
          model: Products,
        },
      },
      {
        model: Users,
        attributes: ["id", "email", "firstName", "lastName"],
      },
    ],
    order: ["paymentStatus"],
  });
  res.status(200).json({ orders });
};
exports.confirmPayment = async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.users;
  // const { paymentStatus } = req.body;
  if (role !== "ADMIN")
    return res.status(400).json({ message: "You are unauthorize" });
  await Orders.update(
    { paymentStatus: "CONFIRMED" },
    { where: { id } }
  );
  res.status(200).json({ message: "Payment Updated" });
};

exports.rejectPayment = async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.users;
  // const { paymentStatus } = req.body;
  if (role !== "ADMIN")
    return res.status(400).json({ message: "You are unauthorize" });
  await Orders.update({ paymentStatus: "REJECT" }, { where: { id } });
  res.status(200).json({ message: "Payment Updated" });
};
exports.getAllCategories = async (req, res, next) => {
  const { role } = req.users;
  if (role !== "ADMIN")
    return res.status(400).json({ message: "You are unauthorize" });
  const productCategories = await ProductCategories.findAll();
  res.status(201).json(productCategories);
};
