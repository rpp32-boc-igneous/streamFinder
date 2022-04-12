import React from 'react';
import $ from 'jquery';

// Components
import Login_Signup from '../components/Login_Signup.jsx';
import Search from '../components/Search.jsx';
import Carousel from '../components/Carousel.jsx';
import VideoCard from '../components/VideoCard.jsx';
import Signup from '../components/Signup.jsx';
import Watchlist from '../components/Watchlist.jsx';
import Settings from '../components/Settings/Settings.jsx';

// Graphics + branding
import banner from '../assets/StreamFinderBanner.png';
import userIcon from '../assets/userIcon.png';
import SFicon from '../assets/StreamFinderIcon_transparent.png';

// Modules
const { deriveTrending } = require('../modules/deriveTrending.js');


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      selectedTitleIndex: 0,
      trending: [],
      user_id: null,
      user_name: null,
      user_email: null,
      watch_list: [],
      watch_history: [],
      subscriptions: []
    }
    this.updateSearchResults = this.updateSearchResults.bind(this);
    this.loadTrending = this.loadTrending.bind(this);
    this.showModal = this.showModal.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.updateState = this.updateState.bind(this);
    this.displaySelectedTitle = this.displaySelectedTitle.bind(this);
  }

  updateState(key, value) {
    this.setState({
      ...this.state,
      key: value
    }, () => {
      this.updateUser();
    })
  }

  updateUser() {
    let options = {
      method: 'post',
      url: '/update_user',
      data: {
        user_id: this.state.user_id,
        user_name: this.state.user_name,
        user_email: this.state.user_email,
        watch_list: this.state.watch_list,
        watch_history: this.state.watch_history,
        subscriptions: this.state.subscriptions,
      },
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
    axios(options)
      .then(result => {
        console.log(result.data);
      })
      .catch(err => {
        console.log('error updating user', err);
      })
  }

  updateSearchResults(data) {
    this.setState({
      ...this.state,
      searchResults: data,
    }, () => {
      console.log('search results updated in App state');
    })
  }

  displaySelectedTitle(index) {

    this.setState({
      ...this.state,
      selectedTitleIndex: index - 1
    }, () => {
      $('#Title-page').css({ display: 'inline-block' });
      $('#carousel').css({ display: 'none' });
      $('#footer').css({ display: 'none' });
    });
  }

  loadTrending() {
    // axios call to API for movie list
    // module analyzes to gather trending
    var trending = deriveTrending(data);
    // trending is loaded in state
  }

  showModal(e) {

    var clickType = e.target.innerHTML;
    var parent = e.target.parentNode.id;
    var clickClass = e.target.className;

    if (clickClass !== 'home') {
      $(`#${clickType}-page`).css({ display: 'inline-block' });
      $('#carousel').css({ display: 'none' });
      $('#footer').css({ display: 'none' });
      $('#banner-box').css({ display: 'none' });
    } else {
      $(`#${parent}`).css({ display: 'none' });
      $('#carousel').css({ display: 'inline-block' });
      $('#footer').css({ display: 'flex' });
      $('#banner-box').css({ display: 'flex' });
    }

  }

  render() {

    return (
      <div>
        <div id='header'>
          <button id='login-button' onClick={this.showModal}>Login</button>
          <Search changePage={this.showModal} cb={this.updateSearchResults} />
        </div>

        <div id='banner-box'>
          <img src={banner} id='banner'></img>
        </div>

        <div id='body'>

          <Carousel searchResults={this.state.searchResults} trending={this.state.trending} displaySelectedTitle={this.displaySelectedTitle} />

          <div id="Title-page">
            <VideoCard title={this.state.searchResults[this.state.selectedTitleIndex]} />
            <img src={SFicon} onClick={this.showModal} className='home'></img>
          </div>

          <div id='Login-page'>
            <Login_Signup />
            <img src={SFicon} onClick={this.showModal} className='home'></img>
          </div>

          <div id='Signup-page'>
            <Signup />
            <img src={SFicon} onClick={this.showModal} className='home'></img>
          </div>

          <div id='Watchlist-page'>
            <Watchlist />
            <img src={SFicon} onClick={this.showModal} className='home'></img>
          </div>

          <div id='Settings-page'>
            <Settings />
            <img src={SFicon} onClick={this.showModal} className='home'></img>
          </div>

        </div>

        <div id='footer'>
          <div id='trending-button' className='footer-button'>Trending</div>
          <div className='divider'>|</div>
          <div id='watchlist-button' className='footer-button' onClick={this.showModal}>Watchlist</div>
          <div className='divider' >|</div>
          <div id='settings-button' className='footer-button' onClick={this.showModal}>Settings</div>
        </div>
      </div>
    )

  }
}

export default App;


//<div id="banner">StreamFinder</div>
