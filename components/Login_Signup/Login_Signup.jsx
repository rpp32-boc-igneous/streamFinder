import React from "react";
import $ from "jquery";
import GoogleLogin from "react-google-login";

class Login_Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleGoogleOauthSubmit = this.handleGoogleOauthSubmit.bind(this);
    this.handleMySpaceOauthSubmit = this.handleMySpaceOauthSubmit.bind(this);
    this.handleAOLOauthSubmit = this.handleAOLOauthSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
    this.redirectToSignUp = this.props.showModal;
    this.liftUserInfoUp = this.props.updateState;
  }

  // *** props.updateUserState accepts an object with these properties:
  // user_name: ...,
  // user_email: ...,
  // watch_list: ...,
  // watch_history: ...,
  // subscriptions: ...,
  // and updates state accordingly

  handleOauthSubmit(event) {
    event.preventDefault();
    $.ajax({
      url: "/oauth",
      method: "GET",
      success: function () {
        console.log("This is the successfull post of the google oauth attempt");
      },
    });
  }

  handleGoogleOauthSubmit(event) {
    event.preventDefault();

    $.ajax({
      url: "/oauth/google",
      method: "GET",
      success: (google_url) => url,
    })
      .then((google_url) => {
        let consent_url = google_url;
        console.log("Consenting to:", consent_url);
        window.open(consent_url);
      })
      .catch((error) => error);
  }

  handleAOLOauthSubmit(event) {}

  handleMySpaceOauthSubmit(event) {}

  responseGoogle(response) {
    console.log("Response: ", response);
  }

  onSuccess(response) {
    // Define the user object
    let name = response.profileObj.name;
    let email = response.profileObj.email;
    let imageUrl = response.profileObj.imageUrl;
    let first_name = response.profileObj.givenName;

    //Check the DB and see if there is a user with the matching profile
    $.ajax({
      url: "/oauth/verifyUser",
      method: "GET",
      data: { name, email, first_name },
      success: (result) => result,
    })
      .then((result) => {
        console.log("This is the return of the verify User", result);
        if (!result) {
          console.log("This is the no user condition");
          let pseudoEvent = {
            target: {
              innerHTML: "Signup",
              parentNode: {
                id: "header",
              },
              className: "",
            },
          };
          this.redirectToSignUp(pseudoEvent);
        } else {
          console.log(
            "This would be where I have an actual user in the DB: ",
            result
          );
          // Need to discuss using a user object in state and not individual key value pairs
          // this.liftUserInfoUp()
        }
      })
      .catch((error) => error);

    console.log(name, email, first_name);
  }

  onFailure(response) {
    console.log("This is the failure response: ", response);
  }

  render() {
    return (
      <div>
        <h1>StreamFinder</h1>
        <div>
          <h3>Sign In</h3>
          <form>
            <input type="text" name="userName" placeholder="User Name"></input>
            <input
              autocomplete="on"
              type="password"
              name="password"
              placeholder="Password"
            ></input>
            <input
              type="submit"
              value="Submit"
              onClick={this.handleLoginSubmit}
            />
          </form>
          <h3>or Sign in with</h3>
          <GoogleLogin
            clientId="768315598088-9hct54aqr973f9uccu076mvs5smvlg6j.apps.googleusercontent.com"
            buttonText="Login"
            // redirectUri="http://localhost:3000/oauth/google/redirect"
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
          />
          {/* <form>
            <button onClick={this.handleMySpaceOauthSubmit}>FaceBook</button>
            <button onClick={this.handleAOLOauthSubmit}>MySpace</button>
          </form> */}
        </div>
      </div>
    );
  }
}

export default Login_Signup;

document.getElementById("Main");
