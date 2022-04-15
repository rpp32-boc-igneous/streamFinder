import React from "react";
import $ from "jquery";

class Login_Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleGoogleOauthSubmit = this.handleGoogleOauthSubmit.bind(this);
    this.handleMySpaceOauthSubmit = this.handleMySpaceOauthSubmit.bind(this);
    this.handleAOLOauthSubmit = this.handleAOLOauthSubmit.bind(this);
  }

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
        window.location.href = consent_url;
      })
      .then((e) => {
        $.ajax({
          url: "/openSesame",
          method: "GET",
          success: (data) => {
            console.log("Should have the ID: ", data);
          },
        });
      })
      .catch((error) => error);
  }

  handleAOLOauthSubmit(event) {}

  handleMySpaceOauthSubmit(event) {}

  render() {
    return (
      <div>
        <h1>StreamFinder</h1>
        <div>
          <h3>Sign In</h3>
          <form>
            <input type="text" name="userName" placeholder="User Name"></input>
            <input type="text" name="password" placeholder="Password"></input>
            <input
              type="submit"
              value="Submit"
              onClick={this.handleLoginSubmit}
            />
          </form>
          <h3>or Sign in with</h3>
          <form>
            <button onClick={this.handleGoogleOauthSubmit}>Google</button>
            <button onClick={this.handleMySpaceOauthSubmit}>FaceBook</button>
            <button onClick={this.handleAOLOauthSubmit}>MySpace</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login_Signup;

document.getElementById("Main");
