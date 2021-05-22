const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");
const usersController = require("../controllers/usersController");
const multer = require("../middlewares/addFile");
router.post(
  "/order-request",
  usersController.protect,
  ordersController.orderRequest
);
router.patch(
  "/status/:orderId",
  usersController.protect,
  multer.send,
  ordersController.updateStatus
);
router.get(
  "/payment-form",
  usersController.protect,
  ordersController.getFormPayment
);
module.exports = router;
