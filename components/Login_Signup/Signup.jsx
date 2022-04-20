import React from "react";
import ServiceButtonGroup from "./ServiceButtonGroup.jsx";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [
        "Netflix",
        "Hulu",
        "Amazon Prime Video",
        "Vudu",
        "HBO Max",
        "Disney +",
        "Peacock",
        "Sling TV",
        "Discovery",
      ],
      user_name: "",
      email: "",
      password: "",
      confirm_password: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  handleSubmitClick(e) {
    e.preventDefault();
    console.log("This is the event click: ", e.target.value);
    if (this.verifyPassword()) {
      console.log("Passwords are matching");
    } else {
      console.log("Password mismatch, clear the form data");
    }
  }

  handleInputChange(e) {
    e.preventDefault();
    let userSetting = e.target.className;
    let value = e.target.value;
    let stateChange = {};

    switch (userSetting) {
      case "user_name":
        this.setState({ user_name: value });
        break;
      case "email":
        this.setState({ email: value });
        break;
      case "password":
        this.setState({ password: value });
        break;
      case "confirm_password":
        this.setState({ confirm_password: value });
        break;
      default:
        console.log("This is the default for the case switch");
    }
  }

  verifyPassword(e) {
    // This is lazy but it will work for now
    if (this.state.password !== this.state.confirm_password) {
      alert("Passwords do not match, do not collect 200$");
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <div>
        <h1>Signup</h1>

        <form>
          <input
            className="user_name"
            type="text"
            placeholder="User Name"
            onChange={this.handleInputChange}
          />
          <input
            className="password"
            type="password"
            autocomplete="on"
            placeholder="Password"
            onChange={this.handleInputChange}
          />
          <input
            className="confirm_password"
            type="password"
            autocomplete="on"
            placeholder="Confirm Password"
            onChange={this.handleInputChange}
          />
          <input
            className="password"
            type="text"
            placeholder="Email Address"
            onChange={this.handleInputChange}
          />
          <input
            type="submit"
            value="Submit"
            onClick={this.handleSubmitClick}
          />
        </form>

        <div className="StreamButtonAtSignUp">
          <ServiceButtonGroup services={this.state.services} />
        </div>
      </div>
    );
  }
}

export default Signup;

document.getElementById("Main");
