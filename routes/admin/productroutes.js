const express = require("express");
const {
  allverifiedProduct,
  allunVerifiedProduct,
  unverifiedProductToVerify,
  productToDelete,
  getProduct,
} = require("../../controller/admin/productController");
const { verifyToken } = require("../../config/auth");
require('dotenv').config();
const SECRET_KEY = process.env.ADMIN_JWT;

const router = express.Router({ caseSensitive: true });

router.get("/", (req, res) => {
  res.send({
    user: "productroutes",
  });
});

router.get("/allverifiedproduct",(req,res,next) => verifyToken(req,res,next,SECRET_KEY),allverifiedProduct);
router.get("/allunverifiedproduct", allunVerifiedProduct);
router.post("/verifyproduct/:id", unverifiedProductToVerify);
router.delete("/:id", productToDelete);
router.get("/:id", getProduct);

module.exports = router;
