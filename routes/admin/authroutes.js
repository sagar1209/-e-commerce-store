const express = require("express");
const {register , login , logOut} = require("../../controller/admin/authController");
const {expireToken} = require('../../config/auth')

const router = express.Router({ caseSensitive: true });


router.get("/", (req, res) => {
  res.send({
    user: "authroutes",
  });
});

router.post('/register',register);
router.post('/login',login);
router.post('/logout',expireToken,logOut)

module.exports = router;
