const express = require("express");
const router = express.Router();
const google_oauth = require("./google_auth.js");

router.use((req, res, next) => {
  console.log("The router has been used: " + Date.now());
  next();
});

//Get login URL
// router.get("/", (req, res) => {
//   console.log("This is a thing");
//   res.end();
// });

router.get("/fake", (req, res) => {
  console.log("This should not work if I understand this correctly");
  res.end();
});

//Getting the user from Google with the code
router.get("/google", (req, res) => {
  console.log("This is the google code: ", google_oauth.get_code());
});

//Getting the current user
router.get("/redirect/google", (req, res) => {
  console.log("This is a successful redirect..");
  console.log(req.query);
  res.end();
});

// router.get("/google", google);
// router.get("/facebook", facebook);
// roter.get("/myspace", myspace);

module.exports = router;
