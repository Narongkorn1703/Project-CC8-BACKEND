const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsController");
const usersController = require("../controllers/usersController");

router.get("/getall-products", productController.getAllProduct);
router.get("/search", productController.getByKeywordUser);
router.get("/getProductsByType", productController.getProductsByType);
module.exports = router;
