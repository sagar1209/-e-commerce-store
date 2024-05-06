const express = require("express");
const authroutes = require("./authroutes");
const productroutes = require("./productroutes");
const likeroutes = require("./likeroutes");
const commentroutes = require("./commentroutes");
const cartroutes = require("./cartroutes");
const orderroutes = require("./orderroutes");

const router = express.Router();

router.use("/auth", authroutes);
router.use("/product", productroutes);
router.use("/like", likeroutes);
router.use("/comment", commentroutes);
router.use("/cart", cartroutes);
router.use("/order",orderroutes);

module.exports = router;
