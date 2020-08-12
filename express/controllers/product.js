const Product = require('../models/product')
const fs = require('fs')

module.exports = {
    addProduct:async (req, res, next) => {
        try {  
            const file = req.files.file
            let product = JSON.parse(req.body.body)
            let url = `/static/${Date.now().toString()}_${file.name}`
            file.mv(`.${url}`,async (result,err)=>{
                if(!err){
                    product.url = url
                    product = new Product(product)
                    await product.save()
                    res.status(201).json(product)
                }
            })
        } catch (error) {
            res.status(400).json(error)
        }
    },
    updateProduct:async (req, res, next) => {
        let {_id} = req.query;
        let update = req.body;
        await Product.findByIdAndUpdate(_id,update,{useFindAndModify:false})
        let product = await Product.findById(_id)
        res.status(201).json(product)
    },
    deleteProduct:async (req, res, next) => {
        let {_id} = req.query;
        console.log(_id)
        let product = await Product.findByIdAndDelete(_id)
        product ? fs.unlinkSync(`.${product.url}`) : console.log('no product')
        res.status(201).json(product)
    },
    getProducts:async (req, res, next) => {
        try {  
            let products = await Product.find()
            products.reverse()
            res.status(200).json(products)
        } catch (error) {
            res.status(400).json(error)
        }
    },      
    getProduct:async (req, res, next) => {
        try { 
            const {_id} = req.query 
            let product = await Product.findById(_id)
            res.status(200).json(product)
        } catch (error) {
            res.status(400).json(error)
        }
    }          
}