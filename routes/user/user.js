const express = require('express');
const authroutes = require('./authroutes');
const productroutes = require('./productroutes');
const likeroutes = require('./likeroutes')
const commentroutes = require('./commentroutes')

const router = express.Router();

router.use('/auth',authroutes);
router.use('/product',productroutes);
router.use('/like',likeroutes);
router.use('/comment',commentroutes);

module.exports = router;