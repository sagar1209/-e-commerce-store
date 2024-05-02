const express = require("express");
const {
  allverifiedProduct,
  allunVerifiedProduct,
  verifyProduct ,
  deleteProduct ,
  getProduct,
  specifyUserProduct
} = require("../../controller/admin/productController");
const { verifyToken } = require("../../config/auth");
const SECRET_KEY = process.env.ADMIN_JWT;

const router = express.Router({ caseSensitive: true });

router.get("/allverifiedproduct",(req,res,next) => verifyToken(req,res,next,SECRET_KEY),allverifiedProduct);
router.get("/allunverifiedproduct",(req,res,next) => verifyToken(req,res,next,SECRET_KEY), allunVerifiedProduct);
router.patch("/verifyproduct/:id", (req,res,next) => verifyToken(req,res,next,SECRET_KEY),verifyProduct);
router.delete("/:id",(req,res,next) => verifyToken(req,res,next,SECRET_KEY), deleteProduct );
router.get("/:id",(req,res,next) => verifyToken(req,res,next,SECRET_KEY), getProduct);
router.get("/products/:user_id",(req,res,next) => verifyToken(req,res,next,SECRET_KEY),specifyUserProduct);

module.exports = router;
