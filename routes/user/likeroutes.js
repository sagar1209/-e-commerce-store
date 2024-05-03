const express = require("express");
const {verifyToken} = require('../../config/auth');
const { likeOrUnlike ,allLikeProduct} = require("../../controller/user/likeController");
const SECRET_KEY = process.env.USER_JWT;

const router = express.Router({ caseSensitive: true });

router.post('/:id',(req,res,next)=> verifyToken(req,res,next,SECRET_KEY),likeOrUnlike);
router.get('/',(req,res,next)=> verifyToken(req,res,next,SECRET_KEY),allLikeProduct);

module.exports = router;
