const Product = require('../../models/product');

const getProductsByVerifyStatus = async (req, res, query) => {
  try {
    const  {category} = req.query;
    if (category) {
     query.category = { $regex: new RegExp(category, 'i') };
    }

    const products = await Product.find(query).populate('owner');
    console.log(products)
    const newProducts = products.map(product => ({
      _id: product._id,
      owner: product.owner.username,
      name: product.name,
      category: product.category,
      price: product.price,
      stockQuantity: product.stockQuantity,
    }));
    res.status(200).json({ products: newProducts });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const allverifiedProduct = async(req,res)=> getProductsByVerifyStatus(req,res,{isVerify :true});

const allunVerifiedProduct = async(req,res)=> getProductsByVerifyStatus(req,res,{isVerify :false});

const verifyProduct  =  async(req,res)=>{
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(400).json({ error: "Product doesn't exits" });
        }
        if(product.isVerify){
            return res.status(400).json({Message: "Product Already Verified" });
        }
        await Product.findByIdAndUpdate(id,{isVerify : true},{ new: true });
        res.status(200).json({message : "Product Verify Successfully"})
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ error: "Invalid product ID" });
          }
          res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteProduct  = async(req,res)=>{
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
          return res.status(400).json({ error: "Product doesn't exits" });
        }
        await Product.findOneAndDelete({_id :id});
        res.status(200).json({ message: "Product removed successfully" });
      } catch (error) {
        if (error.name === "CastError") {
          return res.status(400).json({ error: "Invalid product ID" });
        }
        res.status(500).json({ error: "Internal Server Error" });
      }
}

const getProduct = async(req,res)=>{
    try {
        const id = req.params.id;
    
        const product = await Product.findById(id).populate("owner");
        if (!product) {
          return res.status(400).json({ error: "Product doesn't exits" });
        }
        const newProduct = {
          _id: product._id,
          owner: product.owner.username,
          name: product.name,
          category: product.category,
          description: product.description,
          imageUrl: product.imageUrl,
          price: product.price,
          isVerify : product.isVerify,
          stockQuantity: product.stockQuantity,
        };
        res.status(200).json({ product: newProduct });
      } catch (error) {
        if (error.name === "CastError") {
          return res.status(400).json({ error: "Invalid product ID" });
        }
        res.status(500).json("Internal Server Error");
      }
    }
    
const specifyUserProduct = async(req,res)=>{
      try {
        const id = req.params.user_id;
        const products = await Product.find({owner : id}).populate('owner');
        if(!products){
           return res.status(200).json({message : "Products don't exit"});
        }
        const newProducts = products.map((product) => ({
          _id: product._id,
          owner: product.owner.username,
          name: product.name,
          category: product.category,
          price: product.price,
          stockQuantity: product.stockQuantity,
          isVerify : product.isVerify
        }));
        res.status(200).json({newProducts});
        
      } catch (error) {
        if (error.name === "CastError") {
          return res.status(400).json({ error: "Invalid User ID" });
        }
        res.status(500).json("Internal Server Error");
  }
}

module.exports = {
    allverifiedProduct,
    allunVerifiedProduct,
    verifyProduct ,
    deleteProduct ,
    getProduct,
    specifyUserProduct
}