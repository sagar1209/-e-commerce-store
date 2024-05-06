const express = require("express");
const {verifyToken} = require('../../config/auth');
const { addItem,deleteItem ,allProduct,incQuantity,decQuantity} = require("../../controller/user/cartController");
const SECRET_KEY = process.env.USER_JWT;

const router = express.Router({ caseSensitive: true });

router.post('/:id',(req,res,next)=> verifyToken(req,res,next,SECRET_KEY) ,addItem);
router.delete('/:id',(req,res,next)=> verifyToken(req,res,next,SECRET_KEY) , deleteItem);
router.get('/',(req,res,next)=> verifyToken(req,res,next,SECRET_KEY) , allProduct);
router.put('/inc/:id',(req,res,next)=> verifyToken(req,res,next,SECRET_KEY) , incQuantity);
router.put('/dec/:id',(req,res,next)=> verifyToken(req,res,next,SECRET_KEY) , decQuantity);


module.exports = router;