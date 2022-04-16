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
          <input type="text" placeHolder="User Name" />
          <input type="text" placeHolder="Password" />
          <input type="text" placeHolder="Confirm Password" />
          <input type="text" placeHolder="Email Address" />
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
