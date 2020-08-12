const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Mongodb schema for user collection 
const orderSchema = new Schema({
    name:String,
    email:String,
    address:String,
    items:[
        {
            title:String,
            price:Number,
            stock:Number,
            brand:String,
            category:String,
            description:String,
            soldBy:String,
            url:String,
            feature:String
        }
    ]
})

module.exports = mongoose.model('order', orderSchema)