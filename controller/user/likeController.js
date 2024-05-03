const Like = require('../../models/like')


const likeOrUnlike = async (req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.id; 
        const likeProduct = await Like.findOneAndDelete({ product: productId, user: userId });

        if (!likeProduct) {
            const newLikeProduct = new Like({ product: productId, user: userId });
            await newLikeProduct.save();
            return res.status(200).json({
                message: "Product liked",
                isLike: true
            });
        } else {
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
        const likeProducts = await Like.find({user : userId}).populate('product').select('product');
        
        res.status(200).json({
            products : likeProducts,
        })
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ error: "Invalid User ID" });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    likeOrUnlike,
    allLikeProduct
}