const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productsControllers');
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

const router = express.Router();

router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRole("admin"), createProduct);
router.route("/products").get(getAllProducts);
router.route("/admin/update/:id").put(isAuthenticatedUser, authorizeRole("admin"), updateProduct);
router.route("/admin/product/:id")
      .delete(isAuthenticatedUser, authorizeRole("admin"), deleteProduct);
router.route("/product/:id").get(getProductDetails);

module.exports = router;