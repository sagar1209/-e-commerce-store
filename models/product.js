const mongoose = require('mongoose');

const ProductShema = mongoose.Schema({
     name : {
        type : String,
        required : true,
     },
     description : {
         type : String,
         required : true,
     },
     price : {
         type : Number,
         required : true,
         min : 0
     },
     category: {
        type: String,
        required: true,
        enum : ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Others']
    },
    stockQuantity: {
        type: Number,
        required: true,
        min : 0
    },
    imageUrl: {
        type: String,
    },
},{
    timeStamp : true,
})

const Product = mongoose.model('Product',ProductShema);

module.exports = Product;

