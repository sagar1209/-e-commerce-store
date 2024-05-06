const express = require("express");
const {verifyToken} = require('../../config/auth');
const { createOrder} = require("../../controller/user/orderController");
const SECRET_KEY = process.env.USER_JWT;

const router = express.Router({ caseSensitive: true });

router.post('/',(req,res,next) => verifyToken(req,res,next,SECRET_KEY),createOrder);

module.exports = router;