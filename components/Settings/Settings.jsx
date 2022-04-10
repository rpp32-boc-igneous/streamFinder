import React from 'react';
import $ from 'jquery';
import UserInfo from './UserInfo.jsx';
import StreamList from './StreamList.jsx';
import StreamStore from './StreamStore.jsx';
import EditUser from './EditUser.jsx';
import { AiOutlineClose } from 'react-icons/ai';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streamCards: [
        'stream1', 'stream2', 'stream3', 'stream4', 'stream5', 'stream6',
        'stream7', 'stream8', 'stream9', 'stream10', 'stream11', 'stream12',
        'stream13', 'stream14', 'stream15', 'stream16', 'stream17', 'stream18'
      ],
      streams: [
        {name: 'Netflix', subbed: false, default: true},
        {name:'Prime', subbed: false, default: true},
        {name:'Hulu', subbed: false, default: true},
        {name:'HBOmax', subbed: false, default: true},
        {name:'Vudu', subbed: false, default: true},
        {name:'Disney', subbed: false, default: true}
      ]
    };
  }

  close = () => {
    $(`#Settings-page`).css({ display: 'none' });
    $('#carousel').css({ display: 'inline-block' });
    $('#footer').css({ display: 'flex' });
    $('#banner-box').css({ display: 'flex' });
  }

  // signOut = () => {
  // }

  addStream = (name) => {
    let index = this.state.streams.findIndex(stream => stream.name === name);
    if (index < 0) {
      this.setState( state => (
        { streams: [...state.streams, {name: name, subbed: true, default: false}]}
      ));
    }
  }

  removeStream = (name) => {
    let index = this.state.streams.findIndex(stream => stream.name === name);
    if (index >= 0) {
      let newStreams = this.state.streams;
      newStreams.splice(index, 1);
      this.setState({streams: newStreams});
      $(`#remove-${name}`).addClass('hide');
      $(`#store-${name}`).removeClass('subscribed');
      $(`#sub-${name}`).removeClass('hide');
      $(`#unsub-${name}`).addClass('hide');
    }
  }

  render() {
    return (
      <div>
        <div id='account'>
          <span onClick={this.close}><AiOutlineClose class='close icon'/></span>
          <h1>Account</h1>
          <UserInfo />
          <button className='button' onClick={this.signOut}>Sign out</button>
          <StreamList
            streams={this.state.streams}
            removeStream={this.removeStream}
          />
        </div>
        <EditUser/>
        <StreamStore
          streams={this.state.streamCards}
          addStream={this.addStream}
          removeStream={this.removeStream}
        />
      </div>
    );
  }
}

export default Settings;
