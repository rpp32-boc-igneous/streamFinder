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
    };
  }

  // *** props.updateUserState accepts an object with these properties:
  // user_name: ...,
  // user_email: ...,
  // watch_list: ...,
  // watch_history: ...,
  // subscriptions: ...,
  // and updates state accordingly

  render() {
    return (
      <div>
        <h1>Signup</h1>
        <form>
          <input type="text" placeholder="User Name" />
          <input type="password" autocomplete="on" placeholder="Password" />
          <input
            type="password"
            autocomplete="on"
            placeholder="Confirm Password"
          />
          <input type="text" placeholder="Email Address" />
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
