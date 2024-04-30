const express = require("express");
const {allUser,
  removeUser} = require("../../controller/admin/userController")

const router = express.Router({ caseSensitive: true });


router.get("/", (req, res) => {
  res.send({
    user: "user",
  });
});

router.get('/alluser',allUser);
router.delete('/removeuser/:id',removeUser);

module.exports = router;
