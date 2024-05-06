const Order = require('../../models/order');
const Cart = require('../../models/cart');
const Product = require('../../models/product');


const calculateTotalPrice = async (items) => {
    const totalPrice = items.reduce((total, item) => {
        return total + (item.quantity * item.product.price);
    }, 0);
    return totalPrice;
};

const createOrder = async (req, res) => {
    try {
        const userId = req.id;
        let cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: "User's cart not found" });
        }
        const totalPrice = await calculateTotalPrice(cart.items);
        const order = new Order({
            user: userId,
            products: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
            })),
            totalPrice: totalPrice,
        });
        await Promise.all(cart.items.map(async (item) => {
            const product = await Product.findById(item.product._id);
            if (!product) {
                throw new Error(`Product with ID ${item.product._id} not found`);
            }
            product.stockQuantity -= item.quantity;
            await product.save();
        }));
        cart.items = [];
        await cart.save();
        await order.save();
        return res.status(200).json({ order, message: "Order placed successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    createOrder
}