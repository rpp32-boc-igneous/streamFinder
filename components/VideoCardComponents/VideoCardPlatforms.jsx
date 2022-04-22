import React from 'react';

class VideoCardPlatforms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.isSubscribed = this.isSubscribed.bind(this);
  }

  isSubscribed(title, subscriptions) {
    for (var i = 0; i < subscriptions.length; i++) {
      if (subscriptions[i] === title) {
        return true;
      }
    }
    return false;
  }


  render() {

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
      return newArray;
    }



    return (
      <div id='video-card-platforms'>
        {removeDuplicateSources(this.props.title.sources).map((item, i) => {
          let subscribed = this.isSubscribed(item.name, this.props.subscriptions);
          if (subscribed === true) {
            return (
              <span key={i}>
                <a href={item.web_url} className="subscribed-link" target="_blank" rel="noopener noreferrer">{item.name}</a><br></br>
              </span>
            )
          } else {
            return (
              <span key={i}>
                <a href={item.web_url} className="platformLink" target="_blank" rel="noopener noreferrer">{item.name}</a><br></br>
              </span>
            )
          }
        }
        )}
      </div>
    )
  }
}

export default VideoCardPlatforms;