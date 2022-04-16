const express = require("express");
const router = express.Router();
const google_oauth = require("./google_auth.js");
const cors = require("cors");
const { User } = require("../database/index.js");

router.use(cors());
router.use((req, res, next) => {
  console.log("The router has been used: " + Date.now());
  next();
});

// Entrance to the validated portion of the app
router.get("/openSesame", (req, res) => {
  let id_cookie = JSON.parse(req.cookies.id);
  res.send(id_cookie);
});

// Getting the user from Google with the code
router.get("/google", (req, res) => {
  const url = google_oauth.get_url();
  console.log("This is the access code URL: ", url);
  res.send(url);
});

// Getting the current user
router.get("/google/redirect", (req, res) => {
  let code = req.query.code;
  console.log("We made it", req);
  // let id_info =
  google_oauth
    .get_code(code)
    .then((code) => {
      let id_info = JSON.stringify(code);
      res.cookie("id", id_info).redirect("/oauth/openSesame");
    })
    .catch((error) => res.send(error));
});

// Verify the user in the DB, add if not there
router.get("/verifyUser", (req, res) => {
  console.log("This is the verify user route", req.query);
  User.find({ email: "jarrod83miller@gmail.com" })
    .then((result) => {
      console.log("This is the DB search result", result);
    })
    .catch((error) => error);
  res.end();
});

// router.get("/facebook", AOL);
// roter.get("/myspace", myspace);

module.exports = router;
