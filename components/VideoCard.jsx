import React from 'react';
import VideoCardOverview from './videoCardComponents/VideoCardOverview.jsx'
import VideoCardPlatforms from './videoCardComponents/VideoCardPlatforms.jsx'

class VideoCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    let display =  <div id='video-card-default'>Loading Program Information...</div>

    if (this.props.title !== undefined) {
      display =
      <div id='video-card-info'>
        <img id='video-card-billboard' src={this.props.title.backdrop}></img>
        <VideoCardOverview title={this.props.title} addToWatchlist={this.props.addToWatchlist}/>
        <VideoCardPlatforms title={this.props.title} subscriptions={this.props.subscriptions}/>
      </div>
    }


    return (
      <div id="video-card">
      {display}
      </div>
    )
  }
}

/*
backdrop: "https://cdn.watchmode.com/backdrops/01434738_bd_w780.jpg"
critic_score: 82
end_year: null
genre_names: (2) ['Drama', 'Romance']
genres: (2) [7, 14]
id: 1434738
imdb_id: "tt0120338"
network_names: []
networks: null
original_language: "en"
original_title: "Titanic"
plot_overview: "101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic, 84 years later. A young Rose boards the ship with her mother and fiancé. Meanwhile, Jack Dawson and Fabrizio De Rossi win third-class tickets aboard the ship. Rose tells the whole story from Titanic's departure through to its death—on its first and last voyage—on April 15, 1912."
poster: "https://cdn.watchmode.com/posters/01434738_poster_w185.jpg"
release_date: "1997-11-18"
relevance_percentile: 99.59
runtime_minutes: 194
similar_titles: (25) [1411293, 1261570, 136644, 1325612, 1409931, 1189953, 1390779, 1321818, 1385709, 14126, 1465849, 1307725, 1204879, 161171, 1250035, 1177510, 1115269, 1133772, 1138145, 1395115, 1406213, 1381595, 1292240, 1415335, 1231643]
sources: (31) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
title: "Titanic"
tmdb_id: 597
tmdb_type: "movie"
trailer: "https://www.youtube.com/watch?v=CHekzSiZjrY"
trailer_thumbnail: "https://cdn.watchmode.com/video_thumbnails/638996_pthumbnail_320.jpg"
type: "movie"
us_rating: "PG-13"
user_rating: 7.6
year: 1997
*/



export default VideoCard;