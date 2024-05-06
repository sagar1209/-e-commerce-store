const Cart = require("../../models/cart");
const Product = require("../../models/product");

const addItem = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await new Cart({ user: userId, items: [] });
    }
    const existingItemIndex = cart.items.findIndex((item) =>
      item.product.equals(productId)
    );
    if (existingItemIndex !== -1) {
      if (cart.items[existingItemIndex].quantity < product.stockQuantity) {
        cart.items[existingItemIndex].quantity += 1;
      } else {
        return res.status(400).json({ message: "Quantity limit exceeded" });
      }
    } else {
      cart.items.push({ product: productId, quantity: 1 });
    }
    await cart.save();
    res
      .status(200)
      .json({ message: "Product added to cart successfully", cart });
  } catch (error) {
    handleError(res, error);
  }
};

const deleteItem = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.id;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "User's cart not found" });
    }
    cart.items = cart.items.filter((item) => !item.product.equals(productId));
    await cart.save();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

const allProduct = async (req, res) => {
  try {
    const userId = req.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(404).json({ message: "User's cart not found" });
    }

    const products = cart.items.map((item) => ({
    //    item
      _id: item.product._id,
      name: item.product.name,
      category: item.product.category,
      price: item.product.price,
      quantity: item.quantity,
      stockQuantity : item.product.stockQuantity
    }));

    return res.status(200).json({ products: products });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateQuantity = async (req, res, updateFun) => {
  try {
    const productId = req.params.id;
    const userId = req.id;
    let cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      return res.status(404).json({ message: "User's cart not found" });
    }
    cart.items = cart.items.map((item) => {
      if (item.product.equals(productId)) {
        updateFun(item);
      }
      return item;
    });
    await cart.save();
    const products = cart.items.map((item) => ({
      _id: item.product._id,
      name: item.product.name,
      category: item.product.category,
      price: item.product.price,
      quantity: item.quantity,
      stockQuantity : item.product.stockQuantity
    }));
    return res.status(200).json({ products: products ,message: "update successfull"});
  } catch (error) {
    handleError(res, error);
  }
};

const incQuantity = async (req, res) => {
  updateQuantity(req, res,async (item) => {
    try {
        if(item.product.stockQuantity > item.quantity){
            item.quantity+=1;
        }   
    } catch (error) {
        handleError(res, error);
    }
  });
};

const decQuantity = async (req, res) => {
   updateQuantity(req, res, (item) => {
    try {  
        if(item.quantity > 1) {item.quantity -= 1;}
    } catch (error) {
        handleError(res, error);
    }
   });
};

const handleError = (res, error) => {
  if (error.name === "CastError")
    return res.status(400).json({ error: "Invalid product ID" });
  console.error(error);
  return res.status(500).json({ error: "Internal Server Error" });
};

module.exports = {
  addItem,
  deleteItem,
  allProduct,
  incQuantity,
  decQuantity,
};
