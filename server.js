const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'))

app.listen(port, () => {
  console.log('listening on port ', port);
});

app.get('/search', (req, res) => {
  console.log('get request search button');
  res.send('get request search button');
});


