const express = require('express');
const authroutes = require('./authroutes');
const productroutes = require('./productroutes');

const router = express.Router();

router.use('/auth',authroutes);
router.use('/product',productroutes);

module.exports = router;