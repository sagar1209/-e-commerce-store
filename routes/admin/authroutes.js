const express = require("express");
const {register , login , logOut} = require("../../controller/admin/authController");
const {verifyToken,expireToken} = require('../../config/auth')
const SECRET_KEY =  process.env.USER_JWT;

const router = express.Router({ caseSensitive: true });


router.post('/register',register);
router.post('/login',login);
router.post('/logout',(req,res,next)=> verifyToken(req,res,next,SECRET_KEY),expireToken,logOut)

module.exports = router;
