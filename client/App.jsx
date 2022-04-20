import React from "react";
import $ from "jquery";

// Components
import Login_Signup from "../components/Login_Signup/Login_Signup.jsx";
import Signup from "../components/Login_Signup/Signup.jsx";
import Search from "../components/Search.jsx";
import Carousel from "../components/Carousel.jsx";
import VideoCard from "../components/VideoCard.jsx";
import Watchlist from "../components/Watchlist.jsx";
import Settings from "../components/Settings/Settings.jsx";

// Graphics + branding
import banner from "../assets/StreamFinderBanner.png";
import userIcon from "../assets/userIcon.png";
import SFicon from "../assets/StreamFinderIcon_transparent.png";

// Mock data
import { mockTrending } from "../mock_data/trending.js";

// Modules
const { deriveTrending } = require("../modules/deriveTrending.js");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: null,
      searchResults: [],
      selectedTitleIndex: 0,
      trending: mockTrending,
      active: mockTrending,
      carouselType: "trending",
      user_name: null,
      user_email: null,
      watch_list: [],
      watch_history: [],
      subscriptions: ["Disney Plus", "iTunes", "Amazon"],
    };
    this.updateSearchResults = this.updateSearchResults.bind(this);
    this.showModal = this.showModal.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.updateState = this.updateState.bind(this);
    this.displaySelectedTitle = this.displaySelectedTitle.bind(this);
    this.showTrending = this.showTrending.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.addToWatchlist = this.addToWatchlist.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
  }

  componentDidMount() {
    $("#trending-button").addClass("button-focus");
  }

  // receives key / value pair, updates user state,
  // then calls updateUser to replace the user record in the database
  updateState(key, value) {
    this.setState(
      {
        ...this.state,
        key: value,
      },
      () => {
        this.updateUser();
      }
    );
  }

  updateUserState(obj) {
    this.setState(
      {
        ...this.state,
        user_name: obj.user_name,
        user_email: obj.user_email,
        watch_list: obj.watch_list,
        watch_history: obj.watch_history,
        subscriptions: obj.subscriptions,
      },
      () => {
        console.log("user refreshed in state");
        this.updateUser();
      }
    );
  }

  addToWatchlist(obj) {
    let watchlist = this.state.watch_list.slice();
    watchlist.push(obj);
    this.setState(
      {
        ...this.state,
        watch_list: watchlist,
      },
      () => {
        //console.log('watchlist is now ', this.state.watch_list)
      }
    );
  }

  updateUser() {
    let options = {
      method: "post",
      url: "/update_user",
      data: {
        user_id: this.state.user_id,
        user_name: this.state.user_name,
        user_email: this.state.user_email,
        watch_list: this.state.watch_list,
        watch_history: this.state.watch_history,
        subscriptions: this.state.subscriptions,
      },
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    axios(options)
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log("error updating user", err);
      });
  }

  // updates search term in state for carousel label,
  // i.e "showing search results for Titanic"
  updateSearchTerm(term) {
    this.setState({
      ...this.state,
      searchTerm: term,
    });
  }

  // receives data from Search component and sets state, with results,
  // sets "active" to relevant dataset for clicks to VideoCard component
  // sets carouselType to 'searchResults
  updateSearchResults(data) {
    this.setState(
      {
        ...this.state,
        searchResults: data,
        active: data,
        carouselType: "searchResults",
      },
      () => {
        $("#trending-button").removeClass("button-focus");
      }
    );
  }

  // receives the name of a key in state + an index and
  // sets state with index and sets "active" to reflect
  // relevant dataset for VideoCard display
  displaySelectedTitle(keyname, index) {
    var targetData = this.state[keyname];
    this.setState(
      {
        ...this.state,
        selectedTitleIndex: index,
        active: targetData,
      },
      () => {
        $("#Title-page").css({ display: "inline-block" });
        $("#carousel").css({ display: "none" });
        $("#footer").css({ display: "none" });
      }
    );
  }

  // changes display in SPA
  showModal(e) {
    var clickType = e.target.innerHTML;
    var parent = e.target.parentNode.id;
    var clickClass = e.target.className;

    if (clickClass !== "home") {
      if (clickType === "Signup") {
        $("#Login-page").css({ display: "none" });
      }
      if (clickType === "Settings" || "Watchlist") {
        $(`#${clickType}-page`).css({ display: "inline-block" });
        $("#carousel").css({ display: "none" });
        $("#footer").css({ display: "none" });
        $("#banner-box").css({ display: "none" });
        $("#header").css({ display: "none" });
      }
      $(`#${clickType}-page`).css({ display: "inline-block" });
      $("#carousel").css({ display: "none" });
      $("#footer").css({ display: "none" });
      $("#banner-box").css({ display: "none" });
    } else {
      $("#Signup-page").css({ display: "none" });
      $(`#${parent}`).css({ display: "none" });
      $("#carousel").css({ display: "inline-block" });
      $("#footer").css({ display: "flex" });
      $("#banner-box").css({ display: "flex" });
      $("#header").css({ display: "flex" });
      $("#account").removeClass("hide");
      $("#store").addClass("hide");
      $("#update-box").addClass("hide");
    }
  }

  // handles trending button display
  showTrending() {
    var trending = this.state.trending.slice();
    this.setState(
      {
        ...this.state,
        active: trending,
        carouselType: "trending",
      },
      () => {
        $("#trending-button").addClass("button-focus");
      }
    );
  }

  render() {
    return (
      <div>
        <div id="header">
          <button id="login-button" onClick={this.showModal}>
            Login
          </button>
          <button id="signup-button" onClick={this.showModal}>
            Signup
          </button>
          <Search
            changePage={this.showModal}
            cb={this.updateSearchResults}
            updateTerm={this.updateSearchTerm}
          />
        </div>

        <div id="banner-box">
          <img src={banner} id="banner"></img>
        </div>

        <div id="body">
          <Carousel
            carouselType={this.state.carouselType}
            searchResults={this.state.active}
            trending={this.state.trending}
            displaySelectedTitle={this.displaySelectedTitle}
            searchTerm={this.state.searchTerm}
          />

          <div className="page" id="Title-page">
            <VideoCard
              title={this.state.active[this.state.selectedTitleIndex]}
              addToWatchlist={this.addToWatchlist}
              subscriptions={this.state.subscriptions}
            />
            <img
              src={SFicon}
              onClick={this.showModal}
              className="home"
              id="home-title"
            ></img>
          </div>

          <div className="page" id="Login-page">
            <Login_Signup
              updateUserState={this.updateUserState}
              showModal={this.showModal}
            />
            <img
              src={SFicon}
              onClick={this.showModal}
              className="home"
              id="home-login"
            ></img>
          </div>

          <div className="page" id="Signup-page">
            <Signup
              updateUserState={this.updateUserState}
              showModal={this.showModal}
            />
            <img
              src={SFicon}
              onClick={this.showModal}
              className="home"
              id="home-signup"
            ></img>
          </div>

          <div className="page" id="Watchlist-page">
            <Watchlist
              watch_list={this.state.watch_list}
              watch_history={this.state.watch_history}
              displaySelectedTitle={this.displaySelectedTitle}
            />
            <img
              src={SFicon}
              onClick={this.showModal}
              className="home"
              id="home-watchlist"
            ></img>
          </div>

          <div className="page" id="Settings-page">
            <Settings />
            <img
              src={SFicon}
              onClick={this.showModal}
              className="home"
              id="home-settings"
            ></img>
          </div>
        </div>

        <div id="footer">
          <div
            id="trending-button"
            className="footer-button"
            onClick={this.showTrending}
          >
            Trending
          </div>
          <div className="divider">|</div>
          <div
            id="watchlist-button"
            className="footer-button"
            onClick={this.showModal}
          >
            Watchlist
          </div>
          <div className="divider">|</div>
          <div
            id="settings-button"
            className="footer-button"
            onClick={this.showModal}
          >
            Settings
          </div>
        </div>
      </div>
    );
  }
}

export default App;
