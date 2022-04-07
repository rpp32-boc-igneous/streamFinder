require('dotenv').config();
const key = process.env.API_KEY;
const axios = require('axios');
const Promise = require('bluebird');

var searchTitle = (string) => {
  const res = await axios.get(`https://api.watchmode.com/v1/title/345534/details/?apiKey=${key}&append_to_response=sources`);
  return res;
}

var related = (array) => {
  var promises = [];
  for (let i = 0; i < array.length; i++) {
    var id = Number(array[i]);
    promises.push(new Promise((resolve, reject) => {
      resolve(axios.get(`https://api.watchmode.com/v1/title/${id}/details/?apiKey=${key}&append_to_response=sources`))
    }))
  }
}

module.exports = {
  searchTitle: searchTitle
}