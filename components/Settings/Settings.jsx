import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import UserInfo from './UserInfo.jsx';
import StreamList from './StreamList.jsx';
import StreamStore from './StreamStore.jsx';
import EditUser from './EditUser.jsx';
import { AiOutlineClose } from 'react-icons/ai';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: [
        // {
        //   name:'movie1',
        //   logo: 'https://i.pinimg.com/474x/f8/b2/4f/f8b24f01d7059f6b63c5572d0d3a736b.jpg',
        //   no_ads: false,
        //   free: true,
        //   cost: 0,
        //   subscription: false,
        //   website: 'https://google.com'
        // },
        // {
        //   name:'show1',
        //   logo: 'https://i.pinimg.com/474x/f8/b2/4f/f8b24f01d7059f6b63c5572d0d3a736b.jpg',
        //   no_ads: true,
        //   free: false,
        //   cost: 10,
        //   subscription: true,
        //   website: 'https://google.com'
        // },
        // {
        //   name:'movie2',
        //   logo: 'https://i.pinimg.com/474x/f8/b2/4f/f8b24f01d7059f6b63c5572d0d3a736b.jpg',
        //   no_ads: true,
        //   free: true,
        //   cost: 0,
        //   subscription: false,
        //   website: 'https://google.com'
        // },
        // {
        //   name:'show2',
        //   logo: 'https://i.pinimg.com/474x/f8/b2/4f/f8b24f01d7059f6b63c5572d0d3a736b.jpg',
        //   no_ads: false,
        //   free: false,
        //   cost: 5.99,
        //   subscription: true,
        //   website: 'https://google.com'
        // }
      ],
      defaultSubs: [
        // {name: 'netflix', default: true, _id: "62550cf08b0715e896c88e19"},
        // {name:'amazon-prime', default: true, _id: '62550dee8b0715e896c88e1b'},
        // {name:'hulu', default: true, _id: '62550e558b0715e896c88e1d'},
        // {name:'HBOmax', default: true, _id: '6255148cf095c769813492ad'},
        // {name:'vudu', default: true, _id: "6255130df095c769813492a9"},
        // {name:'disney-plus', default: true, _id:"625513b8f095c769813492ab"}
      ],
      subs: [],
      updateField: null,
      URL: 'http://localhost:3000',
      user: {
            name: 'Jane',
            email: 'jane@gmail.com',
            pwd: '*****'
            }
    };
  }

  ComponentDidMount () {
    // this.getSubs();
  }

  componentDidUpdate() {
    console.log('update');
    if (this.state.streams.length === 0){
      this.getStreams();
    }
  }

  getStreams = () => {
    axios.get(`${this.state.URL}/streams`)
    .then(data => {
      this.setState({streams: data.data}, () => this.getDefaults())
    })
    .catch(err => console.log('all streams request failed'));
  }

  getDefaults = () => {
    const defaults = this.state.streams.reduce((acc, stream) => {
      if (stream.default === true) {
        acc.push({name: stream.name, default: true, _id: stream._id});
      }
      return acc;
    }, []);

    this.setState({defaultSubs: defaults}, () => console.log(this.state.defaultSubs));
  }

  getSubs = () => {
    let subs = this.state.subs.map(sub => {
      this.state.streams.find(stream => stream.name === sub);
    });
    console.log(subs);
  }

  close = () => {
    $(`#Settings-page`).css({ display: 'none' });
    $('#carousel').css({ display: 'inline-block' });
    $('#footer').css({ display: 'flex' });
    $('#banner-box').css({ display: 'flex' });
  }

  setUpdateField = (field) => {
    this.setState({updateField: field});
  }

  isSubbed = (name) => {
    return this.state.subs.includes(name);
  }

  showRemove = (id) => {
    $(`#${id} .remove-stream`).hasClass('hide') ?
      $(`#${id} .remove-stream`).removeClass('hide') :
      $(`#${id} .remove-stream`).addClass('hide')
  };

  changeSubscription = (stream) => {
    console.log(stream)
    this.isSubbed(stream.name) ?
      this.unsubscribe(stream.name, stream._id) :
      this.subscribe(stream.name, stream._id)
  }

  subscribe = (name, id) => {
    $(`#store-${id}`).addClass('subscribed');

    axios.patch(`${this.state.URL}/streams/${name}?field=subscribed&val=true`)
    .then(() =>{
      console.log(`now subscribed to ${name}`)
    })
    .catch(err => console.log(`error subscribing to ${name}`))

    this.setState( state => ({ subs: [...state.subs, name]}),
    () => console.log(this.state.subs));
  }

  unsubscribe = (name, id, isDefault) => {
    // axios.patch(`${this.state.URL}/streams/${name}?field=subscribed&val=false`)
    // .then(() =>{
    //   console.log(`now unsubscribed from ${name}`)
    // })
    // .catch(err => console.log(`error unsubscribing from ${name}`))
    $(`#store-${id}`).removeClass('subscribed');
    if (isDefault)  $(`#${id} .checkbox`).prop('checked', false);
    let newSubs = this.state.subs.filter(sub => sub !== name);
    this.setState({subs: newSubs}, () => console.log(this.state.subs));
  }

  formatName = (name) => {
    return name
    .replace(/-/g, ' ')
    .replace(/ plus/g, '+ ')
    .replace(/(?: |\b)(\w)/g, (key) => {
      return key.toUpperCase();
    })
  }

  addStream = (stream) => {
    this.subscribe(stream.name, stream._id);
    const index = this.state.defaultSubs.findIndex(sub => sub.name === stream.name);
    console.log(index)
    if (index < 0){
        this.setState( state => (
          { defaultSubs: [...state.defaultSubs, {name: stream.name, default: stream.default, _id: stream._id}]}
        ));
    } else {
      $(`#${stream._id} .checkbox`).prop('checked', true);
    }
  }

  removeStream = (name, id, isDefault) => {
    // let clone = this.state.defaultSubs;
    this.unsubscribe(name, id);
    let newStreams = this.state.defaultSubs.filter(stream => stream.name !== name);
    this.setState({defaultSubs: newStreams});
  }

  render() {
    return (
      <div id='settings-container'>
        <div id='account' >
          <span onClick={this.close}><AiOutlineClose className='close icon' id='settings-close'/></span>
          <div className='account-heading'>Account</div>
          <UserInfo user={this.state.user} setField={this.setUpdateField}/>
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
        <EditUser field={this.state.updateField}/>
        <StreamStore
          streams={this.state.streams}
          addStream={this.addStream}
          removeStream={this.removeStream}
          unsubscribe={this.unsubscribe}
        />
      </div>
    );
  }
}

export default Settings;
