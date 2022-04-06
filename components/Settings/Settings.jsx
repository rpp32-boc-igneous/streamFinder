import React from 'react';
import UserInfo from './UserInfo.jsx';
import StreamList from './StreamList.jsx';
import StreamStore from './StreamStore.jsx';
import { AiOutlineClose } from 'react-icons/ai';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <AiOutlineClose id='close' />
        <h1>Account</h1>
        <UserInfo />
        <button className='button'>Sign out</button>
        <StreamList/>
        <StreamStore />
      </div>
    );
  }
}

export default Settings;
