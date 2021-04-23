const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsController");
const usersController = require("../controllers/usersController");

router.get("/getall-products", productController.getAllProduct);
module.exports = router;
