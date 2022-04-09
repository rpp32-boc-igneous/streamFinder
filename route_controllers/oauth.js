const express = require("express");
const router = express.Router();
const passport = require("passport");

router.use((req, res, next) => {
  console.log("The router has been used: " + Date.now());
  next();
});

router.get("/", (req, res) => {
  console.log("This is a thing");
  res.end();
});

router.get("/google", google);
router.get("/facebook", facebook);
roter.get("/myspace", myspace);

module.exports = router;
