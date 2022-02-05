const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productsControllers');
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

const router = express.Router();

router.route("/product/new").post(isAuthenticatedUser, authorizeRole("admin"), createProduct);
router.route("/products").get(getAllProducts);
router.route("/update/:id").put(isAuthenticatedUser, authorizeRole("admin"), updateProduct);
router.route("/product/:id")
      .delete(isAuthenticatedUser, authorizeRole("admin"), deleteProduct)
      .get(getProductDetails);

module.exports = router;