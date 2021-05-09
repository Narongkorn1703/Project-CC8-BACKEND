const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const usersController = require("../controllers/usersController");
const multer = require("../middlewares/addFile");
router.post(
  "/addproduct",
  usersController.protect,
  multer.send,
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
  multer.send,
  adminController.updateProduct
);
router.patch(
  "/payment-update/:id",
  usersController.protect,
  adminController.confirmPayment
);
router.patch(
  "/payment-reject/:id",
  usersController.protect,
  adminController.rejectPayment
);
router.patch(
  "/delete/:id",
  usersController.protect,
  adminController.deleteProduct
);
router.get(
  "/search-payment",
  usersController.protect,
  adminController.getAllKeywordPayment
);

module.exports = router;
