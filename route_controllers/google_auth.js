const { google } = require("googleapis");
const app = require("express")();
const axios = require("axios");
require("dotenv").config();
const $ = require("jquery");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/oauth/redirect/google"
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

const google_auth_url = JSON.stringify(
  oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  })
);

// console.log(
//   "This is the client: ",
//   JSON.stringify(oauth2Client.generateAuthUrl())
// );

module.exports.get_code = async function getAuthorizationCode(google_auth_url) {
  await $.ajax({
    url: google_auth_url,
    method: "GET",
    success: (data) => {
      Console.log(data);
    },
  });
};
