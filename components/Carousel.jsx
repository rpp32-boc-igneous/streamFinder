import React from 'react';
import VideoCard from './VideoCard.jsx';

var previousResults = null;

var Carousel = (props) => {

  var searchResults = props.searchResults;
  var trending = props.trending;
  var newResults = false;

  if (JSON.stringify(searchResults) !== JSON.stringify(previousResults)) {
    previousResults = searchResults;
    newResults = true;
  }

  if (newResults) {
    return (
      <div id="carousel">{newResults.map(item =>
        <VideoCard program={item} />)
      }</div>
    )
  } else if (trending) {
    return (
      <div id="carousel">{trending.map(item =>
        <VideoCard program={item} />)
      }</div>
    )
  } else {
    return (
      <div id="carousel">
        <div>loading carousel content...</div>
      </div>
    )
  }

}

export default Carousel;


