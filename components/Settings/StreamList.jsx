import React, { useState, useEffect } from 'react';
import Stream from './Stream.jsx';
import { IoAdd } from 'react-icons/io5';

const StreamList = (props) => {
  return (
    <div className='streamList'>
      <h1 id='streamTitle'>Streams</h1>
      <IoAdd className='add' />
      <div id='streamContainer'>
        <input className='box' type='checkbox' name='Netflix' />
        Netflix
        <input className='box' type='checkbox' name='Prime' />
        Prime
        <input className='box' type='checkbox' name='Hulu' />
        Hulu
        <input className='box' type='checkbox' name='HBOmax' />
        HBOmax
        <input className='box' type='checkbox' name='Vudu' />
        Vudu
        <input className='box' type='checkbox' name='Disney+' />
        Disney+
      </div>
    </div>
  );
};

export default StreamList;
