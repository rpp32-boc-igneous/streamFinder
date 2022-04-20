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

////////////////////////////
// Getting the current user :::: Not working Currently
////////////////////////////
router.get("/google/redirect", (req, res) => {
  // I will need to check the DB here and see if there is an existing user..
  // This currently isnt being used. Need to figure this out or delete it...
  console.log("Just want to check and see if this is running??");
  // let id_info =
  google_oauth
    .get_code(code)
    .then((code) => {
      let id_info = JSON.stringify(code);
      res.cookie("id", id_info).redirect("/oauth/openSesame");
    })
    .catch((error) => res.send(error));
});

// Checks the DB for an existing user and returns it if currently exists
// If new user, new entry is added to the Users collection and returned
// If user is not in the DB we need to redirect the user to the Sign up page
router.get("/verifyUser", (req, res) => {
  let query = { email: req.query.email };
  let user = {
    email: req.query.email,
    name: req.query.name,
    first_name: req.query.first_name,
  };
  let options = { upsert: true };

  User.findOne(query)
    .then((user) => {
      console.log("This is the findOne result: ", user);
      if (user === null) {
        console.log("User does not exist, redirecting to sign up");
        res.send(false);
      } else {
        res.send(user);
      }
    })
    .catch((error) => error);
});

// router.get("/facebook", AOL);
// roter.get("/myspace", myspace);

module.exports = router;
