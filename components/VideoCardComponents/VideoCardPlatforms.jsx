import React from 'react';
import axios from 'axios';

class VideoCardPlatforms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      URL:'http://localhost:3000'
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

  getStreams(){
    axios
      .get(`${this.state.URL}/streams`)
      .then((data) => {
        console.log(data);
        this.setState({ streams: data.data });
      })
      .catch((err) => console.log("all streams request failed"));
  };

  componentDidMount() {
    this.getStreams();
    console.log(this.state.streams);
  }


  render() {
    const removeDuplicateSources = (dataArray) => {
      let services = {};
      let newArray = [];

      for (var i = 0; i < dataArray.length; i++) {
        if (services[dataArray[i].name] === undefined) {
          services[dataArray[i].name] = dataArray[i];
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
                <a href={item.web_url} className="subscribedLink" target="_blank" rel="noopener noreferrer">{item.name}</a><br></br>
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