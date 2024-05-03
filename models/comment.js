const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true,
    },
    product :{
        type : mongoose.Schema.Types.ObjectId,
        ref :'Product',
        required: true,
    },
    content : {
        type: String,
        require: [true,"comment is required"],
    },
    commentAt : {
        type : Date,
        default : Date.now(),
    }
})

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;