const express = require('express');
const authroutes = require('./authroutes');
const productroutes = require('./productroutes');
const userroutes= require('./user')

const router = express.Router({ caseSensitive: true });


router.use('/auth',authroutes);
router.use('/product',productroutes);
router.use('/user',userroutes);

module.exports = router;