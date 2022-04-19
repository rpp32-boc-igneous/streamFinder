import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { AiOutlineClose } from 'react-icons/ai';
import FilterList from './FilterList.jsx';
import StreamCard from './StreamCard.jsx';
import StreamSearch from './StreamSearch.jsx';

const StreamStore = (props) => {
  const [keyword, setKeyword] = useState(null);
  const [streams, setStreams] = useState(props.streams);
  const [searchResults, setSearchResults] = useState([]);
  const [ads, setAds] = useState(false);
  const [free, setFree] = useState(false);
  const [searching, setSearching] = useState(false);
  // const [list, setList] = useState(streams);

  // console.log('streams', streams, 'searchResults', searchResults);
  // console.log('ads', ads, 'free', free, 'searching', searching);

  useEffect(() => {
    setStreams(props.streams)
  }, [props.streams])

  useEffect(() => {
    // console.log(searchResults);

  //   (searching) ?
  //     setList(searchResults):
  //     setList(props.streams)
  }, [searchResults])

  const closeStore = () => {
    $('#store').addClass('hide');
    $('#account').removeClass('hide');
  }

  const searchStreams = (keyword) => {
    const results = streams.filter(stream => {
    return stream.name.includes(keyword);
    });
    setSearchResults(results);
    setStreams(results);
    setSearching(true);
  }

  const clearSearchResults = () => {
    setSearchResults([]);
    setSearching(false);

    if (ads) filterAds();
    if(free) filterFree();
  }

  const filterAds = () => {
    let list = searching ? searchResults : props.stream;
    let results;
    if($('#no_ads').prop('checked')) {
      setAds(true);
      results = list.filter(stream => {
      return stream.no_ads === true;
      });
    } else {
      setAds(false);
      if (free) {
        results = list.filter(stream => {
          return stream.free === true
         })
      }else {
        results = list;
      }
    }
    setStreams(results);
  }

  const filterFree = () => {
    let list = searching ? searchResults : props.stream;
    let results;
    if($('#free').prop('checked')) {
      setFree(true);
      results = list.filter(stream => {
      return stream.free === true;
      });
    } else {
      setFree(false);
      if (ads) {
        results = list.filter(stream => {
          return stream.no_ads === true && stream.free === false;
        });
      } else {
        results = list;
      }
    }
    setStreams(results);
  }

  return (
    <div id='store' className='hide'>
      <span
        onClick={closeStore}>
          <AiOutlineClose
        className='icon close'
        id='close-store'/></span>
      <FilterList
        filterAds={filterAds}
        filterFree={filterFree}
        streams={streams}
      />
      <StreamSearch
        search={searchStreams}
        clear={clearSearchResults}
      />
      <div id='stream-grid' className='grid'>
        {streams.map(stream => (
          <StreamCard
            key={stream._id}
            stream={stream}
            addStream={props.addStream}
            removeStream={props.removeStream}
            unsubscribe={props.unsubscribe}
          />
        ))}
      </div>
      <div id='pages'>1 2 3 4 ></div>
    </div>
  );
};

export default StreamStore;
