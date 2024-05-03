const Like = require('../../models/like')
const Product = require('../../models/product')

const likeOrUnlike = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).json({ error: "Product doesn't exits" });
        }
        const productId = req.params.id;
        const userId = req.id; 
        const likeProduct = await Like.findOneAndDelete({ product: productId, user: userId });

        if (!likeProduct) {
            const newLikeProduct = new Like({ product: productId, user: userId });
            await newLikeProduct.save();
            product.likes.push(newLikeProduct._id);
            await product.save();
            return res.status(200).json({
                message: "Product liked",
                isLike: true
            });
        } else {
            console.log(product);
           // Assuming likeProduct._id is the ID of the like you want to remove
            product.likes = product.likes.filter(likeId => likeId.toString() !== likeProduct._id.toString());
            await product.save();
 
            await product.save();
            return res.status(200).json({
                message: "Product unliked",
                isLike: false
            });
        }
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ error: "Invalid product ID" });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const allLikeProduct = async(req,res)=>{
    try {
        const userId = req.id;
        const likeProducts = await Like.find({ user: userId })
        .populate('product')
        .populate('user');

        const newLikeProducts =  likeProducts.map((likeProduct)=>({
            _id : likeProduct.product._id,
            owner : likeProduct.user.username,
            name : likeProduct.product.name,
            price : likeProduct.product.price,
            category : likeProduct.product.category,
            stockQuantity : likeProduct.product.stockQuantity,
            createdAt : likeProduct.likedAt
        }))
        res.status(200).json({
            likes : newLikeProducts,
        })
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    likeOrUnlike,
    allLikeProduct
}