const express = require("express");

const router = express.Router({ caseSensitive: true });


router.get("/", (req, res) => {
  res.send({
    user: "user",
  });
});

module.exports = router;
