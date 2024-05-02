const express = require("express");
const {allUser,
  removeUser} = require("../../controller/admin/userController")

const router = express.Router({ caseSensitive: true });
const SECRET_KEY = process.env.ADMIN_JWT;
const {verifyToken}  = require('../../config/auth')

router.get('/alluser',(req,res,next)=> verifyToken(req,res,next,SECRET_KEY),allUser);
router.delete('/removeuser/:id',(req,res,next)=> verifyToken(req,res,next,SECRET_KEY),removeUser);

module.exports = router;
