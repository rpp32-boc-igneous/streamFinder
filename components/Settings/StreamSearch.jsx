import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { IoSearch } from "react-icons/io5";
import { AiOutlineClose } from 'react-icons/ai';


const StreamSearch = (props) => {

  const [iconClass, setIconClass] = useState('hide');

  // useEffect(() => [

  // ])

  const searchStreams = (e) => {
    e.preventDefault();
    let keyword = $('#search-bar').val();
    props.search(keyword);
    setIconClass('');
    // $('#search-bar').val('');
  }

  const checkEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchStreams(e);
    };
  }

  const clearSearch = () => {
    setIconClass('hide');
    $('#search-bar').val('');
    props.clear();
  }

  return (
    <div id='stream-search'>
      <input
        type='text'
        placeholder='Search'
        id='search-bar'
        onKeyPress={(e) => checkEnter(e)}
      />
      <span id='search-x'
        className={iconClass}
        onClick={() => clearSearch()}
      >
         <AiOutlineClose />
      </span>
      <span
        id='search-icon'
        onClick={(e) => searchStreams(e)}
      >
        <IoSearch id='search-btn' />
      </span>
    </div>
  );
};

export default StreamSearch;
