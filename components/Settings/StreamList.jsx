import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import Stream from './Stream.jsx';
import { IoAdd } from 'react-icons/io5';

const StreamList = (props) => {
//   const defaultStreams = [
//     {name: 'Netflix', subbed: true},
//     {name:'Prime', subbed: false},
//     {name:'Hulu', subbed: false},
//     {name:'HBOmax', subbed: false},
//     {name:'Vudu', subbed: false},
//     {name:'Disney+', subbed: false}
//   ];
//   const [streams, setStreams] = useState(defaultStreams);

  const openStore = () => {
    $('#account').addClass('hide');
    $('#store').removeClass('hide');
  }

  const addStream = (stream) => {
    setStreams(streams.concat({name: stream, subbed: true}));
  }

  return (
    <div className='streamList'>
      <h1 id='streamTitle'>Streams</h1>
      <IoAdd className='add' onClick={openStore}/>
      <div id='streamContainer'>
        {props.streams.map((stream, i) => (
         <Stream
         key={i}
         stream={stream.name}
         subbed={stream.subbed}
         default={stream.default}
         removeStream={props.removeStream}
         />
        ))}
      </div>
    </div>
  );
};

export default StreamList;