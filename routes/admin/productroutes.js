const express = require("express");
const {
  allverifiedProduct,
  allunVerifiedProduct,
  unverifiedProductToVerify,
  unverifiedProductToDelete,
  verifiedProductToDelete
} = require("../../controller/admin/productController");


const router = express.Router({ caseSensitive: true });


router.get("/", (req, res) => {
  res.send({
    user: "productroutes",
  });
});

router.get('/allverifiedproduct',allverifiedProduct);
router.get('/allunverifiedproduct',allunVerifiedProduct);
router.post('/verifyproduct',unverifiedProductToVerify);
router.delete('/unverifiedproducttodelete',unverifiedProductToDelete);
router.delete('/verifiedproducttodelete',verifiedProductToDelete);

module.exports = router;
