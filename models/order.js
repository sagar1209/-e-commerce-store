const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref :'User'
    },
    products : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Product'
            },
            quantity : {
                type : Number,
                required : true,
            }
        }
    ],
    totalPrice : {
        type : Number,
        required :true,
    }
});

const Order = mongoose.model('Order',orderSchema);;

module.exports = Order;
