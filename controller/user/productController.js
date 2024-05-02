const Product = require("../../models/product");
const mongoose = require("mongoose");

const getProductsWithQuery = async (req, res, query) => {
  try {
    // search functionality add
     const  {category} = req.query;
     if (category) {
      query.category = { $regex: new RegExp(category, 'i') };
    }
    const products = await Product.find(query).populate('owner');
    const newProducts = products.map(product => ({
      _id : product._id,
      owner: product.owner.username,
      name: product.name,
      category: product.category,
      price: product.price,
      stockQuantity: product.stockQuantity,
      isVerify: product.isVerify,
    }));
    res.status(200).json({ products: newProducts });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllProduct = async (req, res) => getProductsWithQuery(req,res,{ isVerify: true,owner :{$ne: req.id}})

const getAllOwnVerifiedProduct = async (req, res) => getProductsWithQuery(req,res,{ isVerify: true, owner: req.id});

const getAllOwnUnverifiedProduct = async (req, res) => getProductsWithQuery(req,res,{ isVerify: false, owner: req.id});


const addProduct = async (req, res) => {
  try {
    req.body.owner = req.id;
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({
      message: "product add successfully",
      product,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ error: error.message });
    } else {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

const removeProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).select("owner");

    if (!product) {
      return res.status(400).json({ error: "Product doesn't exits" });
    }
    const userID = product.owner.toString();

    if (userID !== req.id) {
      return res
        .status(400)
        .json({ error: "You are not authorized to remove this product" });
    }

    const deletedProduct = await Product.findOneAndDelete({ _id: id });

    if (!deletedProduct) {
      return res.status(400).json({ error: "Failed to delete product" });
    }

    res.status(200).json({ message: "Product removed successfully",product: deletedProduct });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid product ID" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).select("owner");
    if (!product) {
      return res.status(400).json({ error: "Product doesn't exits" });
    }
    const userID = product.owner.toString();

    if (userID !== req.id) {
      return res
        .status(400)
        .json({ error: "You are not authorized to update this product" });
    }
    req.body.isVerify = false;
    const { owner, ...updateFields} = req.body;
    await Product.findByIdAndUpdate(id, updateFields,{new :true});
    res.status(200).json({ message: "Product Update successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid product ID" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProduct = async (req, res) => {
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
      stockQuantity: product.stockQuantity,
    };
    const userID = product.owner._id.toString();
    if (userID === req.id) {
      newProduct.isOwner = true;
      newProduct.isVerify = product.isVerify;
    } else newProduct.isOwner = false;
    res.status(200).json({ product: newProduct });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid product ID" });
    }
    res.status(500).json("Internal Server Error");
  }
};

module.exports = {
  getAllProduct,
  removeProduct,
  updateProduct,
  getAllOwnUnverifiedProduct,
  getAllOwnVerifiedProduct,
  getProduct,
  addProduct,
};
