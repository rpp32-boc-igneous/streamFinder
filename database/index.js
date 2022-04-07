require('dotenv').config();
const key = process.env.DB_KEY;
const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/streamFinder`, { useUnifiedTopology: true, useNewUrlParser: true }, (err, res) => {
  if (err) {
    console.log('error securing db connection ', err);
  } else {
    console.log('db connection success');
  }

});

//based on Watchmode Title Details API
const titleSchema = new mongoose.Schema({
  id: Number,
  title: String,
  original_title: String,
  plot_overview: String,
  type: String,
  runtime_minutes: Number,
  release_date: String,
  genre_names: Array,
  user_rating: Number,
  critic_score: Number,
  us_rating: String,
  poster: String,
  original_language: String,
  similar_titles: Array,
  sources: Array,
});







const Title = mongoose.model('Title', titleSchema);

module.exports = {

  Title: Title

}
