const express = require("express");
const router = express.Router();
const google_oauth = require("./google_auth.js");

router.use((req, res, next) => {
  console.log("The router has been used: " + Date.now());
  next();
});

// Entrance to the validated portion of the app
router.get("/openSesame", (req, res) => {
  console.log("cookies", req.cookies.id);
  let id_cookie = JSON.parse(req.cookies.id);
  res.send(id_cookie);
});

// Getting the user from Google with the code
router.get("/google", (req, res) => {
  const url = google_oauth.get_url();
  // console.log("oauth url controller", url);
  res.send(url);
});

// Getting the current user
router.get("/redirect/google", (req, res) => {
  let code = req.query.code;
  // let id_info =
  google_oauth
    .get_code(code)
    .then((code) => {
      let id_info = JSON.stringify(code);
      res.cookie("id", id_info).redirect("/oauth/openSesame");
    })
    .catch((error) => res.send(error));
});

// router.get("/google", google);
// router.get("/facebook", facebook);
// roter.get("/myspace", myspace);

module.exports = router;
