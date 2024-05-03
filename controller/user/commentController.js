const Comment = require('../../models/comment');
const Product = require('../../models/product');

const addComment = async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).json({ error: "Product doesn't exits" });
        }
        req.body.user = req.id;
        req.body.product = req.params.id;
        const comment = new Comment(req.body);
        await comment.save();
        res.status(200).json({
            createdAt : comment.commentAt,
            message :  "Comment added",
        })
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ error: "Invalid product ID" });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const allCommnetProduct = async(req,res) => {
    try {
        const userId = req.id;
        const commentProducts = await Comment.find({ user: userId })
        .populate('product')
        .populate('user');

        const newCommentProducts =  commentProducts.map((commentProduct)=>({
            _id : commentProduct.product._id,
            owner : commentProduct.user.username,
            name : commentProduct.product.name,
            price : commentProduct.product.price,
            category : commentProduct.product.category,
            stockQuantity : commentProduct.product.stockQuantity,
            content : commentProduct.content,
            createdAt : commentProduct.commentAt
        }))
        res.status(200).json({
            comments : newCommentProducts,
        })
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    addComment,
    allCommnetProduct
}