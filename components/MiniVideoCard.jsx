import React from 'react';

var MiniVideoCard = (props) => {

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
      <div className='video-card'>
        <img id='search-card-img' src={props.obj.poster} onClick={() => {props.selectTitle(carouselType, props.index)}}></img>
        <div id='search-text-detail'>
          <div id='search-card-title'>{props.obj.title + ` (${props.obj.year})`}</div>
          <div id='search-card-rating1'>{props.obj.us_rating}</div>
          <div id='search-card-rating2'>
            <span>Critic Rating: {props.obj.critic_score}/100</span>
          </div>
          <p id='search-card-description'>{descriptionSuperShortener(props.obj.plot_overview)}</p>
        </div>
      </div>
    )
  } else {
    return (
      <div className='video-card'></div>
    )
  }


}

export default MiniVideoCard;

// User Rating (saved)
// <span>User Rating: {props.obj.user_rating}/10 </span>

// "Available On" block
// <div id='search-card-sources'>
//             Available On:

//             <div>{removeDuplicateSources(props.obj.sources).map((item, i) =>
//               <span key={i}>
//                 <a href={item.web_url}>{item.name} </a>
//               </span>
//             )}</div>
//           </div>
//           <a id='search-card-see-more'>See more streaming sources</a>