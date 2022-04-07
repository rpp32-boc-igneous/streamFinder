require('dotenv').config();
const key = process.env.API_KEY;
const axios = require('axios');
const Promise = require('bluebird');

var getTitleId = (string) => {
  return new Promise((resolve, reject) => {
    if (err) {
      reject('error retrieving title id')
    }
    resolve(axios.get(`https://api.watchmode.com/v1/search/?apiKey=${key}&search_field=name&search_value=${string}`))
  }).then(data => data.title_results.id).catch(err => {
    console.log('error retrieving title id', err);
  });
}

var getTitleDetail = (id) => {
  return new Promise((resolve, reject) => {
    resolve(axios.get(`https://api.watchmode.com/v1/title/${id}/details/?apiKey=${key}&append_to_response=sources`))
  }).catch(err => {
    console.log('error retrieving title detail', err);
  })
}

var getRelated = (array) => {
  var promises = [];
  for (let i = 0; i < array.length; i++) {
    var id = Number(array[i]);
    promises.push(new Promise((resolve, reject) => {
      resolve(axios.get(`https://api.watchmode.com/v1/title/${id}/details/?apiKey=${key}&append_to_response=sources`))
    })).catch(err => {
      console.log(`error retrieving related using id#${id}`, err);
    })
  }
  return Promise.all(promises).then(data => data).catch(err => {
    console.log('error completing all promises for related titles')
  })
}

var search = () =>

module.exports = {
  searchTitle: searchTitle
}