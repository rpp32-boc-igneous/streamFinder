import React from 'react';
import $ from 'jquery';

import Login_Signup from '../components/Login_Signup.jsx';
import Search from '../components/Search.jsx';
import SearchResults from '../components/SearchResults.jsx';
import Carousel from '../components/Carousel.jsx';
import Signup from '../components/Signup.jsx';
import Watchlist from '../components/Watchlist.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.changePage = this.changePage.bind(this);
  }

  changePage(e) {

    var clickType = e.target.innerHTML;
    var clickId = e.target.id;

    if (clickType === 'Login') {
      $('#loginSignup_page').css({ 'display': 'inline-block' });
      $('#carousel').css({ 'display': 'none' });
      $('#footer').css({ 'display': 'none' });
    }

    if (clickType === 'home') {
      if (clickId === 'home_from_login') {
        $('#loginSignup_page').css({ 'display': 'none' });
        $('#carousel').css({ 'display': 'inline-block' });
        $('#footer').css({ 'display': 'flex' });
      }
    }
  }

  render() {

    return (
      <div>
        <div id="header">
          <button id="loginButton" onClick={this.changePage}>Login</button>
          <Search changePage={this.changePage}/>
        </div>
        <div id="bannerBox">
          <div id="banner">StreamFinder</div>
        </div>
        <div id="body">
          <Carousel />
          <div id="loginSignup_page">
            <Login_Signup />
            <button id="home_from_login" onClick={this.changePage}>home</button>
          </div>
          <div id="signup_page">
            <Signup />
          </div>
        </div>
        <div id="footer">
          <div id="trendingButton" className="footerButton">Trending</div>
          <div className="divider">|</div>
          <div id="watchlistButton" className="footerButton">Watchlist</div>
          <div className="divider">|</div>
          <div id="settingsButton" className="footerButton">Settings</div>
        </div>
      </div>
    )

  }

}

export default App;