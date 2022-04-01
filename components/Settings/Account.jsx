import React from "react";
import UserInfo from "./UserInfo";
import StreamList from "./StreamList";
import StreamStore from "./StreamStore";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Account</h1>
        <UserInfo />
        <button>Sign out</button>
        <StreamList />
        <StreamStore className="hide" />
      </div>
    );
  }
}

export default Account;
