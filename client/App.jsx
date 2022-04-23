import React from "react";
import $ from "jquery";
import axios from "axios";

// Components
import Login_Signup from "../components/Login_Signup/Login_Signup.jsx";
import Signup from "../components/Login_Signup/Signup.jsx";
import Search from "../components/Search.jsx";
import Carousel from "../components/Carousel.jsx";
import MobileCarousel from "../components/MobileCarousel.jsx";
import VideoCard from "../components/VideoCard.jsx";
import SingleMobileVideoCard from "../components/SingleMobileVideoCard.jsx";
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
      // isDesktop: true,
      searchTerm: null,
      searchResults: [],
      selectedTitleIndex: 0,
      trending: mockTrending,
      active: mockTrending,
      carouselType: "trending",
      user_name: "Jaimie D.",
      user_email: null,
      user_password: null,
      watch_list: [],
      watch_history: [],
<<<<<<< HEAD
      subscriptions: ["Disney Plus", "iTunes", "Amazon"],
      is_logged_in: false,
=======
      subscriptions: ["disney-plus", "iTunes", "amazon-prime"],
      is_logged_in: false
>>>>>>> 45218ca4891ec83512a897ba11c7fed8bd36af8f
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
    this.setUserState = this.setUserState.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.updateSettingsState = this.updateSettingsState.bind(this);
    this.updateScreenSize = this.updateScreenSize.bind(this);
  }

  componentDidMount() {
    $("#trending-button").addClass("button-focus");
    // this.updateScreenSize();
    // window.addEventListener("resize", this.updateScreenSize);
  }

  componentWillUnmount() {
    // window.removeEventListener("resize", this.updateScreenSize);
  }

  updateScreenSize() {
    // this.setState({
    //   ...this.state,
    //   isDesktop: window.innerWidth > 800
    // })
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
    console.log("stuff at app: ", obj);
    this.setState(
      {
        ...this.state,
        user_name: obj.user_name,
        email: obj.email,
        password: obj.password,
        watch_list: obj.watch_list,
        watch_history: obj.watch_history,
        is_logged_in: obj.is_logged_in,
      },
      () => {
        console.log("user refreshed in state");
        this.updateUser();
      }
    );
  }

<<<<<<< HEAD
  setUserState(obj) {
    this.setState(
      {
        ...this.state,
        user_name: obj.user_name,
        email: obj.email,
        password: obj.password,
        watch_list: obj.watch_list,
        watch_history: obj.watch_history,
        is_logged_in: true,
      },
      () => {
        console.log("User information has been set");
        let goToHome = {
          target: {
            innerHTML: "",
            parentNode: {
              id: "Login-page",
            },
            className: "home",
          },
        };
        this.showModal(goToHome);
      }
    );
  }

  handleLogout(e) {
    e.preventDefault();
    this.setState({
      searchTerm: null,
      searchResults: [],
      selectedTitleIndex: 0,
      trending: mockTrending,
      active: mockTrending,
      carouselType: "trending",
      user_name: null,
      email: null,
      password: null,
      watch_list: [],
      watch_history: [],
      subscriptions: ["Disney Plus", "iTunes", "Amazon"],
      is_logged_in: false,
    });
  }

  updateSettingsState(obj) {
    this.setState(
      {
        ...this.state,
        user_email: obj.user_email,
        user_password: obj.user_password,
        subscriptions: obj.subscriptions,
      },
      () => {
        console.log("user settings updated");
        this.updateUser();
      }
    );
=======
  updateSettingsState(key, val) {
    this.setState({
      ...this.state,
      [key]: val
    }, () => {
      console.log("user settings updated");
      this.updateUser();
    })
>>>>>>> 45218ca4891ec83512a897ba11c7fed8bd36af8f
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
      method: "put",
      url: "/update_user",
      data: {
        user_id: this.state.user_id,
        user_name: this.state.user_name,
        email: this.state.email,
        password: this.state.password,
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
        console.log("I don't think this works", result.data);
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
    console.log("display selected title", keyname);
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
        $("#header").css({ display: "none" });
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
    let userObj = {
      user_name: this.state.user_name,
      email: this.state.email,
      user_password: this.state.user_password,
      subscriptions: this.state.subscriptions,
    };

    //const isDesktop = this.state.isDesktop;

    return (
      <div>
        <div id="header">
          <div id="login-signup-box">
            <button
              id="login-button"
              onClick={
                this.state.is_logged_in ? this.handleLogout : this.showModal
              }
            >
              {this.state.is_logged_in ? "Logout" : "Login"}
            </button>
            <button id="signup-button" onClick={this.showModal}>
              Signup
            </button>
            <div id="welcome-message">
              {this.state.user_name !== null ? (
                <div>Welcome Back, {this.state.user_name}</div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
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
          <div id="carousel">
            <Carousel
              carouselType={this.state.carouselType}
              searchResults={this.state.active}
              trending={this.state.trending}
              displaySelectedTitle={this.displaySelectedTitle}
              searchTerm={this.state.searchTerm}
            />

            <MobileCarousel
              carouselType={this.state.carouselType}
              searchResults={this.state.active}
              trending={this.state.trending}
              displaySelectedTitle={this.displaySelectedTitle}
              searchTerm={this.state.searchTerm}
            />
          </div>

          <div className="page" id="Title-page">
            <SingleMobileVideoCard
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

            <VideoCard
              title={this.state.active[this.state.selectedTitleIndex]}
              addToWatchlist={this.addToWatchlist}
              subscriptions={this.state.subscriptions}
            />
          </div>

          <div className="page" id="Login-page">
            <Login_Signup
              updateState={this.updateState}
              updateUserState={this.updateUserState}
              setUserState={this.setUserState}
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
              updateState={this.updateState}
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
            {/* <Settings
              user_name={this.state.user_name}
              email={this.state.password}
              password={this.state.password}
            /> */}
            <Settings
              user={userObj}
              updateSettingsState={this.updateSettingsState}
            />
            <img
              src={SFicon}
              onClick={this.showModal}
              className="home"
              id="home-settings"
            ></img>
          </div>
        </div>

        <div id="footer">
          <div className="footer-button-box">
            <div
              id="trending-button"
              className="footer-button"
              onClick={this.showTrending}
            >
              Trending
            </div>
          </div>
          <div className="divider">|</div>
          <div className="footer-button-box">
            <div
              id="watchlist-button"
              className="footer-button"
              onClick={this.showModal}
            >
              Watchlist
            </div>
          </div>
          <div className="divider">|</div>
          <div className="footer-button-box">
            <div
              id="settings-button"
              className="footer-button"
              onClick={this.showModal}
            >
              Settings
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
