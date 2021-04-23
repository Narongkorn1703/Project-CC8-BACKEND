const { Orders, OrderProducts, sequelize } = require("../models");
const { DateTime } = require("luxon");

exports.orderRequest = async (req, res, next) => {
  //   const now = dt.toLocaleString(DateTime.DATE_SHORT);
  //   console.log(now);

  // const d = DateTime.fromISO(dt)
  //   .setLocale("th")
  //   .toFormat(" dd LLL yyyy tt");

  const transaction = await sequelize.transaction();
  const { id } = req.users;

  const { totalPrice, slipImg } = req.body;
  const { OrderProductLists } = req.body;
  console.log(OrderProductLists);

  try {
    const orders = Orders.create(
      {
        totalPrice,
        slipImgUrl: slipImg,
        userId: id,
        paymentStatus: "PENDING",
      },
      { transaction }
    );
    const insertData = await Promise.all(
      OrderProductLists.map((item) => {
        item.orderId, item.quantity, item.productId;
        return item;
      })
    );
    console.log(insertData);
    const data = await OrderProducts.bulkCreate(insertData, {
      transaction,
    });

    await transaction.commit();

    res.status(200).json({ orders, data });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};
exports.updateStatus = async (req, res, next) => {
  const { id, role } = req.users;
  console.log(role);

  const { orderId, slipImgUrl, dateTime } = req.body;
  // const dt = `${dateTime} ${Times}`;
  if (role !== "USER" && role !== "ADMIN")
    return res.status(401).json({ message: "You are unauthorize" });
  try {
    let orders = await Orders.update(
      { slipImgUrl, dateTime },
      { where: { id: orderId } }
    );
    res.status(200).json({ message: "Order have sent" });
  } catch (err) {
    next(err);
  }
};
exports.getFormPayment = async (req, res, next) => {
  const { role } = req.users;
  const { id } = req.body;
  console.log(id);
  if (role !== "USER" && role !== "ADMIN")
    return res.status(401).json({ message: "You are unauthorize" });

  const order = await Orders.findOne({ where: { id } });
  res.status(200).json({ order });
};
