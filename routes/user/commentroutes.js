const express = require("express");
const {verifyToken} = require('../../config/auth');
const { addComment,allCommnetProduct } = require("../../controller/user/commentController");
const SECRET_KEY = process.env.USER_JWT;

const router = express.Router({ caseSensitive: true });

router.post('/:id',(req,res,next)=> verifyToken(req,res,next,SECRET_KEY),addComment);
router.get('/',(req,res,next)=> verifyToken(req,res,next,SECRET_KEY),allCommnetProduct);


module.exports = router;
