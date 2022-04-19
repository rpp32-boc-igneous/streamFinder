import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import Stream from './Stream.jsx';
import { IoAdd } from 'react-icons/io5';

const StreamList = (props) => {

  const [streams, setStreams] = useState(props.streams);

  useEffect(() => {
    setStreams(props.streams)
  }, [props.streams])

  const openStore = () => {
    $('#account').addClass('hide');
    $('#store').removeClass('hide');
  }

  // const addStream = (stream) => {
  //   setStreams(streams.concat({name: stream, subbed: true}));
  // }

  return (
    <div className='stream-list'>
      <div id='list-header'>
        <h1 id='stream-title'>Streams</h1>
        <IoAdd className='add icon' onClick={openStore}/>
      </div>
      <div id='stream-container'>
        {streams.map(stream => (
         <Stream
         key={stream._id}
         stream={stream}
         subbed={props.subbed(stream.name)}
         removeStream={props.removeStream}
         changeSubscription={props.changeSubscription}
         format={props.format}
         removeIcon={props.removeIcon}
         />
        ))}
      </div>
    </div>
  );
};

export default StreamList;