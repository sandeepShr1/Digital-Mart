const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productsControllers');

const router = express.Router();

router.route("/product/new").post(createProduct);
router.route("/products").get(getAllProducts);
router.route("/update/:id").put(updateProduct);
router.route("/product/:id").delete(deleteProduct).get(getProductDetails);

module.exports = router;