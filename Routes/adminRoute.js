const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const usersController = require("../controllers/usersController");

router.post(
  "/addproduct",
  usersController.protect,
  adminController.addProduct
);
router.get(
  "/getAll",
  usersController.protect,
  adminController.getAllProduct
);
router.get(
  "/get",
  usersController.protect,
  adminController.getByKeyword
);
router.get(
  "/get-allpayment",
  usersController.protect,
  adminController.getAllPayment
);
router.get(
  "/getall-categories",
  usersController.protect,
  adminController.getAllCategories
);
router.get(
  "/get/:id",
  usersController.protect,
  adminController.getById
);

router.put(
  "/update/:id",
  usersController.protect,
  adminController.updateProduct
);
router.patch(
  "/payment-update/:id",
  usersController.protect,
  adminController.confirmPayment
);
router.patch(
  "/delete/:id",
  usersController.protect,
  adminController.deleteProduct
);

module.exports = router;
