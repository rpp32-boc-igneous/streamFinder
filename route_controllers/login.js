const express = require("express");
const router = express.Router();
const cors = require("cors");
const { User } = require("../database/index.js");
const { retrieveUserByEmail } = require("../database/dbMethods.js");

router.use(cors());
router.use((req, res, next) => {
  console.log("The router has been used: " + Date.now());
  next();
});

router.post("/user", (req, res) => {
  console.log("This is the request to the user route: ", req.body);

  let { email, password } = req.body;
  retrieveUserByEmail(email)
    .then((result) => {
      let user = result[0];
      if (user.password === password) {
        res.status(200).send(user);
      } else {
        res.status(201).send(false);
      }
    })
    .catch((error) => console.log(error));
});

module.exports = router;
