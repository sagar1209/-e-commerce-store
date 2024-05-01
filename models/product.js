const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId, // Assuming owner is represented by ObjectId
        ref: 'User', // Reference to the User model
        required: true
    },
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
        required : true,
    },
    isVerify :{
        type : Boolean,
        default : false,
    }
},{
    timestamps: true
})

ProductSchema.pre('save', function(next) {
    this.isVerify = false;
    next();
});

const Product = mongoose.model('Product',ProductSchema);

module.exports = Product;

