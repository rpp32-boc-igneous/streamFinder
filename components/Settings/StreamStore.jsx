import React, { useState, useEffect } from 'react';
import FilterList from './FilterList.jsx';
import Stream from './Stream.jsx';
import StreamSearch from './StreamSearch.jsx';

const StreamStore = (props) => {
  return (
    <div id='store' className='hide'>
      <FilterList />
      <StreamSearch />
      <div>Streams</div>
    </div>
  );
};

export default StreamStore;
