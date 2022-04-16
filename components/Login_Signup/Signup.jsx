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
          <input type="radio" value="Hulu" name="stream" /> Hulu
          <input type="radio" value="Vudu" name="stream" /> Vudu
          <input type="radio" value="HBO_Max" name="stream" /> HBO Max
          <input type="radio" value="Disney +" name="stream" /> Disney +
          <input type="radio" value="Amazon_Prime_Video" name="stream" /> Amazon
          Prime Video
          <input type="radio" value="Peacock" name="stream" /> Peacock
        </div>
      </div>
    );
  }
}

export default Signup;

document.getElementById("Main");
