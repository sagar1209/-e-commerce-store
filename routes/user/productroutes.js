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

router.get('/allproduct',(req,res,next) => verifyToken(req,res,next,SECRET_KEY),getAllProduct);
router.post('/',(req,res,next) => verifyToken(req,res,next,SECRET_KEY),addProduct);
router.delete('/:id',(req,res,next) => verifyToken(req,res,next,SECRET_KEY),removeProduct);
router.get('/allownverifiedproduct',(req,res,next) => verifyToken(req,res,next,SECRET_KEY),getAllOwnVerifiedProduct);
router.get('/allownunverifiedproduct',(req,res,next) => verifyToken(req,res,next,SECRET_KEY),getAllOwnUnverifiedProduct);
router.get('/:id',(req,res,next) => verifyToken(req,res,next,SECRET_KEY),getProduct);
router.patch('/:id',(req,res,next) => verifyToken(req,res,next,SECRET_KEY),updateProduct);
router.patch

module.exports = router;
