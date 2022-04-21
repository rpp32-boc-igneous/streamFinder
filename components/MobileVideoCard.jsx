import React from 'react';

var MobileVideoCard = (props) => {

  let carouselType = props.carouselType;

  const removeDuplicateSources = (dataArray) => {
    let newArray = [];
    let currentSource = '';

    for (var i = 0; i < dataArray.length; i++) {
      if (currentSource === dataArray[i].name) {
        continue;
      } else {
        currentSource = dataArray[i].name;
        newArray.push(dataArray[i]);
      }
    }

    for (var i = 0; i < props.subscriptions; i ++) {
      if (newArray.indexOf(props.subscriptions[i]) !== -1) {
        return [props.subscriptions[i]];
      }
    }
    return [newArray[0]];
  }

  const descriptionShortener = (stringDescription) => {
    let newString = [];
    for (var i = 0; i < stringDescription.length; i ++) {
      newString.push(stringDescription[i]);
      if (stringDescription[i] === '.') {
        return newString.join('');
      }
    }
  }

  const descriptionSuperShortener = (stringDescription) => {
    let newString = [];
    let words = stringDescription.split(' ');
    for (var i = 0; i < words.length; i++) {
      if (newString.length < 10) {
        newString.push(words[i])
      }
    }

    return newString.join(' ').concat('...');
  }

  if (props.obj !== undefined) {
    return (
      <div className='mobile-video-card'>
        <img id='mobile-search-card-img' src={props.obj.poster} onClick={() => {props.selectTitle(carouselType, props.index)}}></img>
        <div id='mobile-search-text-detail'>
          <div id='mobile-search-card-title'>{props.obj.title + ` (${props.obj.year})`}</div>
          <div id='mobile-search-card-rating1'>{props.obj.us_rating}</div>
          <div id='mobile-search-card-rating2'>
            <span>Critic Rating: {props.obj.critic_score}/100</span>
          </div>
          <p id='mobile-search-card-description'>{descriptionSuperShortener(props.obj.plot_overview)}</p>
        </div>
      </div>
    )
  } else {
    return (
      <div className='video-card'></div>
    )
  }


}

export default MobileVideoCard;