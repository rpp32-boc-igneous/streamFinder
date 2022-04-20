const { google } = require("googleapis");
const app = require("express")();
const axios = require("axios");
require("dotenv").config();
const $ = require("jquery");
const jwt = require("jsonwebtoken");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/oauth/redirect/google"
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

module.exports.get_url = function () {
  let url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  return url;
};

module.exports.get_code = async function (code) {
  const { tokens } = await oauth2Client.getToken(code);
  const id_token = jwt.decode(tokens.id_token, { complete: true });
  const id_info = {
    name: id_token.payload.name,
    email: id_token.payload.email,
    picture: id_token.payload.picture,
  };

  return id_info;
};
