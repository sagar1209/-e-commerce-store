const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likedAt: {
        type: Date,
        default: Date.now
    },
});


const Like = mongoose.model('Like',likeSchema);
 
module.exports = Like;