const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true,
    },
    items : [{
        product : {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Product',
            required : true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
          }
    }],
});

const Cart = mongoose.model('Cart',cartSchema);

module.exports = Cart;