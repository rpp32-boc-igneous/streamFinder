import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { AiOutlineClose } from 'react-icons/ai';
import { IoCaretDownOutline } from "react-icons/io5";
import FilterList from './FilterList.jsx';
import StreamCard from './StreamCard.jsx';
import StreamSearch from './StreamSearch.jsx';

const StreamStore = (props) => {
  const [keyword, setKeyword] = useState(null);
  const [streams, setStreams] = useState(props.streams);
  const [searchResults, setSearchResults] = useState(props.streams);
  const [searching, setSearching] = useState(false);
  const [ads, setAds] = useState(false);
  const [free, setFree] = useState(false);
  const [pos, setPos] = useState(0);

  useEffect(() => {
    setStreams(props.streams)
    setSearchResults(props.streams)
  }, [props.streams])

  useEffect(() => {
    setStreams(searchResults)
  }, [searchResults])

  const closeStore = () => {
    $('#store').addClass('hide');
    $('#account').removeClass('hide');
  }

  const regEx = (string) => {
    return string.replace(/\W/g,'').toLowerCase();
  }

  const searchStreams = (keyword) => {
    keyword = regEx(keyword);
    const results = streams.filter(stream => {
    return regEx(stream.name).includes(keyword);
    });
    setSearching(true);
    setSearchResults(results);
    setStreams(results);
  }

  const clearSearchResults = () => {
    setSearching(false);
    let list = props.streams;
    if (ads) list = list.filter(stream => stream.no_ads === true);
    if (free) list = list.filter(stream => stream.free === true);
    setSearchResults(list);
  }

  const filterAds = () => {
    let list = [...searchResults];
    if($('#no_ads').prop('checked')) {
      setAds(true);
      list = list.filter(stream => stream.no_ads === true);
    } else {
      setAds(false);
      if (!searching) list = props.streams;
    }
    if (free) list = list.filter(stream => stream.free === true);
    setStreams(list);
  }

  const filterFree = () => {
    let list = [...searchResults];
    if (ads) list = list.filter(stream => stream.no_ads === true);
    if($('#free').prop('checked')) {
      setFree(true);
      list = list.filter(stream => {
      return stream.free === true;
      });
    } else {
      setFree(false);
      if (!searching) list = props.streams;
    }
    if (ads) list = list.filter(stream => stream.no_ads === true);
    setStreams(list);
  }

  const pageDown = () => {
    if (pos >= -1250) {
      let position = pos;
      const length = 313;
      setPos(position - length);
      console.log(position)
      $('#stream-grid').css('top', `${position}px`)
    }
  }

  // $('body').mousemove((e) => console.log(e.pageY));


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
      <div id='grid-container'>
        <div id='stream-grid' className='grid'>
          {streams.map(stream => (
            <StreamCard
              key={stream._id}
              stream={stream}
              addStream={props.addStream}
              removeStream={props.removeStream}
              unsubscribe={props.unsubscribe}
              subbed={props.subbed}
            />
          ))}
        </div>
      </div>
      <div id='pages' onClick={() => pageDown()}><IoCaretDownOutline /></div>
    </div>
  );
};

export default StreamStore;
