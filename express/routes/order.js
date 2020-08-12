const express = require('express');
const orderController = require('../controllers/order')

const router = express();

router.route('/order')
    .post(orderController.addOrder)
    .get(orderController.getOrderById)

router.route('/orders')
    .get(orderController.getOrders)

router.route('/myorders')
    .get(orderController.getOrdersByMail)

// router.route('/products')
//     .get(productController.getProducts)

module.exports = router;