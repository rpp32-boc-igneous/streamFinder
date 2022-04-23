import React from "react";
import $ from "jquery";
import axios from "axios";
import UserInfo from "./UserInfo.jsx";
import StreamList from "./StreamList.jsx";
import StreamStore from "./StreamStore.jsx";
import EditUser from "./EditUser.jsx";
import { AiOutlineClose } from "react-icons/ai";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: [],
      defaultSubs: [],
      subs: [],
      updateField: null,
      URL: "http://localhost:3000",
      name: "You",
      email: "you@web.com",
      password: "*****",
    };
  }

  componentDidMount() {
    this.clearSubs();
    this.setUser();
    this.setSubs();
    this.getStreams();
  }

  // componentDidUpdate() {
  // }

  getStreams = () => {
    axios
      .get(`${this.state.URL}/streams`)
      .then((data) => {
        // let streams = data.data.sort((a, b) => b.subscribed - a.subscribed);
        this.setState({ streams: data.data }, () => this.getDefaults());
      })
      .catch((err) => console.log("all streams request failed"));
  };

  getDefaults = () => {
    const defaults = this.state.streams.reduce((acc, stream) => {
      if (stream.default === true) {
        acc.push({ name: stream.name, default: true, _id: stream._id });
      }
      return acc;
    }, []);

    const subs = [];
    if (this.state.subs.length > 0) {
      const subscribed = this.state.subs
        .filter((name) => !defaults.find((sub) => sub.name === name))
        .forEach((sub) => {
          subs.push({
            name: sub,
            default: true,
            _id: this.state.streams.find((stream) => stream.name === sub)._id,
          });
        });
    }
    const list = defaults.concat(subs);

    this.setState({ defaultSubs: list });
  };

  setUser = () => {
    if (this.props.user.user_email || this.props.user.user_name) {
      let user = {
        name: this.props.user.user_name,
        email: this.props.user.user_email,
        password: this.props.user.user_password,
      };

      this.setState({
        name: this.props.user.user_name,
        email: this.props.user.user_email,
        password: this.props.user.user_password,
      });

      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  clearSubs = () => {
    axios
      .patch(`${this.state.URL}/streams/clear`)
      .then(() => console.log("subs cleared"))
      .catch((err) => console.log(err));
  };

  setSubs = () => {
    if (this.props.user.subscriptions.length > 0) {
      this.setState({ subs: this.props.user.subscriptions }, () => {
        this.state.subs.forEach((sub) => this.addDbSub(sub));
        // const promises = []
        // this.state.subs.forEach(sub => promises.push(this.addDbSub(sub)));
        // Promise.all(promises).then(() =>  this.getStreams())
      });
      let subscriptions = this.props.user.subscriptions;
      localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
    }
  };

  close = () => {
    $(`#Settings-page`).css({ display: "none" });
    $("#carousel").css({ display: "inline-block" });
    $("#footer").css({ display: "flex" });
    $("#banner-box").css({ display: "flex" });
  };

  setUpdateField = (field) => {
    this.setState({ updateField: field });
  };

  updateAccount = (field, val) => {
    let key = field.toLowerCase();
    console.log(field, val);
    this.setState({ [key]: val }, () => console.log(this.state[key]));
    this.props.updateSettingsState(`user_${key}`, val);
    let currentUser = JSON.parse(localStorage.getItem("user"));
    let user = { ...currentUser, [key]: val };
    localStorage.setItem("user", JSON.stringify(user));
  };

  isSubbed = (name) => {
    return this.state.subs.includes(name);
  };

  showRemove = (id) => {
    $(`#${id} .remove-stream`).hasClass("hide")
      ? $(`#${id} .remove-stream`).removeClass("hide")
      : $(`#${id} .remove-stream`).addClass("hide");
  };

  changeSubscription = (stream) => {
    this.isSubbed(stream.name)
      ? this.unsubscribe(stream.name, stream._id)
      : this.subscribe(stream.name, stream._id);
  };

  subscribe = (name, id) => {
    $(`#store-${id}`).addClass("subscribed");

    this.addDbSub(name);

    this.setState(
      (state) => ({ subs: [...state.subs, name] }),
      () => {
        this.props.updateSettingsState("subscriptions", [...this.state.subs]);
      }
    );
  };

  addDbSub = (name) => {
    axios
      .patch(`${this.state.URL}/streams/${name}?field=subscribed&val=true`)
      .then(() => console.log(`now subscribed to ${name}`))
      .catch((err) => console.log(`error subscribing to ${name}`));
  };

  unsubscribe = (name, id, isDefault) => {
    axios
      .patch(`${this.state.URL}/streams/${name}?field=subscribed&val=false`)
      .then(() => {
        console.log(`now unsubscribed from ${name}`);
      })
      .catch((err) => console.log(`error unsubscribing from ${name}`));

    $(`#store-${id}`).removeClass("subscribed");

    if (isDefault) $(`#${id} .checkbox`).prop("checked", false);

    let newSubs = this.state.subs.filter((sub) => sub !== name);
    this.setState({ subs: newSubs }, () => {
      this.props.updateSettingsState("subscriptions", [...this.state.subs]);
    });
  };

  formatName = (name) => {
    return name
      .replace(/-/g, " ")
      .replace(/ plus/g, "+ ")
      .replace(/(?: |\b)(\w)/g, (key) => {
        return key.toUpperCase();
      });
  };

  addStream = (stream) => {
    this.subscribe(stream.name, stream._id);
    const index = this.state.defaultSubs.findIndex(
      (sub) => sub.name === stream.name
    );
    if (index < 0) {
      this.setState((state) => ({
        defaultSubs: [
          ...state.defaultSubs,
          { name: stream.name, default: stream.default, _id: stream._id },
        ],
      }));
    } else {
      $(`#${stream._id} .checkbox`).prop("checked", true);
    }
  };

  removeStream = (name, id, isDefault) => {
    // let clone = this.state.defaultSubs;
    this.unsubscribe(name, id);
    let newStreams = this.state.defaultSubs.filter(
      (stream) => stream.name !== name
    );
    this.setState({ defaultSubs: newStreams });
  };

  render() {
    return (
      <div id="settings-container">
        <div id="account">
          <span onClick={this.close}>
            <AiOutlineClose className="close icon" id="settings-close" />
          </span>
          <div className="account-heading">Hi {this.state.name}</div>
          <UserInfo
            user={this.state.name}
            email={this.state.email}
            password={this.state.password}
            setField={this.setUpdateField}
          />
          {/* <button className='button' onClick={this.signOut}>Sign out</button> */}
          <StreamList
            streams={this.state.defaultSubs}
            subbed={this.isSubbed}
            removeStream={this.removeStream}
            changeSubscription={this.changeSubscription}
            format={this.formatName}
            removeIcon={this.showRemove}
          />
        </div>
        <EditUser field={this.state.updateField} update={this.updateAccount} />
        <StreamStore
          streams={this.state.streams}
          addStream={this.addStream}
          removeStream={this.removeStream}
          unsubscribe={this.unsubscribe}
          subbed={this.isSubbed}
        />
      </div>
    );
  }
}

export default Settings;
