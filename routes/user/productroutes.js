const express = require("express");
const {
  getAllProduct,
  removeProduct,
  updateProduct,
  getAllOwnUnverifiedProduct,
  getAllOwnVerifiedProduct,
  getProduct,
  addProduct
} = require("../../controller/user/productController");

const router = express.Router({ caseSensitive: true });

router.get("/", (req, res) => {
  res.send({
    user: "productroutes",
  });
});

router.get('/allproduct',getAllProduct);
router.get('/:id',getProduct);
router.get('/allownverifiedproduct',getAllOwnVerifiedProduct);
router.get('/allownunverifiedproduct',getAllOwnUnverifiedProduct);
router.post('/',addProduct);
router.patch('/:id',updateProduct);
router.delete('/:id',removeProduct);

module.exports = router;
