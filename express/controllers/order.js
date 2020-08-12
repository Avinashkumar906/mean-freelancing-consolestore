const Order = require('../models/order')
const Product = require('../models/product')

module.exports = {
    addOrder:async (req, res, next) => {
        try { 
            let order = new Order(req.body)
            order = await order.save()
            order.items.forEach(async (element) => {
                let product = await Product.findById(element._id)
                product.stock = product.stock - element.stock;
                await product.save()
            });
            res.json(order)
        } catch (error) {
            res.status(400).json(error)
        }
    },
    getOrders:async (req, res, next) => {
        try { 
            let orders = await Order.find()
            res.status(200).json(orders)
        } catch (error) {
            res.status(400).json(error)
        }
    },
    getOrdersByMail:async (req, res, next) => {
        try { 
            const {email} = req.query
            let orders = await Order.find({email})
            res.json(orders)
        } catch (error) {
            res.status(400).json(error)
        }
    },
    getOrderById:async (req, res, next) => {
        try { 
            const {_id} = req.query
            let order = await Order.findById(_id)
            res.json(order)
        } catch (error) {
            res.status(400).json(error)
        }
    }          
}