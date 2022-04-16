import React from "react";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Signup</h1>
        <form>
          <input type="text" placeholder="User Name" />
          <input type="text" placeholder="Password" />
          <input type="text" placeholder="Confirm Password" />
          <input type="text" placeholder="Email Address" />
        </form>

        <div className="StreamButtonAtSignUp">
          <input type="radio" value="Netflix" name="stream" /> Netflix
        </div>
      </div>
    );
  }
}

export default Signup;

document.getElementById("Main");
