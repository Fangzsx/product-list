const express = require("express");
const router = express.Router();
const productController = require('./../controllers/productController')

router.route('/')
    .get(productController.getAllProducts)
    .post(productController.createProduct);

router.route('/:id')
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)
    .get(productController.getProduct)

module.exports = router;