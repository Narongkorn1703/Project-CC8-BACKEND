const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");
const usersController = require("../controllers/usersController");
router.post(
  "/order-request",
  usersController.protect,
  ordersController.orderRequest
);
router.patch(
  "/status",
  usersController.protect,
  ordersController.updateStatus
);
router.get(
  "/payment-form",
  usersController.protect,
  ordersController.getFormPayment
);
module.exports = router;
