const express = require("express");
const {
  getAllProduct,
  removeProduct,
  updateProduct,
  getAllOwnUnverifiedProduct,
  getAllOwnVerifiedProduct,
  getProduct,
  addProduct
} = require("../../controller/user/productController");
const { verifyToken } = require("../../config/auth");
const SECRET_KEY = process.env.USER_JWT;

const router = express.Router({ caseSensitive: true });

router.get("/", (req, res) => {
  res.send({
    user: "productroutes",
  });
});

router.get('/allproduct',(req,res,next) => verifyToken(req,res,next,SECRET_KEY),getAllProduct);
router.get('/:id',getProduct);
router.get('/allownverifiedproduct',getAllOwnVerifiedProduct);
router.get('/allownunverifiedproduct',getAllOwnUnverifiedProduct);
router.post('/',addProduct);
router.patch('/:id',updateProduct);
router.delete('/:id',removeProduct);

module.exports = router;
