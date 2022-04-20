import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { AiOutlineClose } from 'react-icons/ai';
import { IoCaretDownOutline } from "react-icons/io5";
import { IoCaretUpOutline } from "react-icons/io5";
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

  useEffect(() => {
    $('#stream-grid').css('top', '0');
    showArrows();
  }, [streams])

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
    let list = props.streams;
    if (ads) list = list.filter(stream => stream.no_ads === true);
    if (free) list = list.filter(stream => stream.free === true);
    setSearchResults(list);
    setSearching(false);
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

  const getPages = () => {
    let widthCSS = window.getComputedStyle(document.getElementById('stream-grid')).getPropertyValue('width');
    let width = parseInt(widthCSS.replace(/[^0-9.]/g, ''));
    let cols = Math.floor(width / 140);
    let rows = Math.ceil(streams.length / cols);
    let pages = Math.ceil(rows / 2);

    return pages;
  }

  const showArrows = (top, bottom) => {
    $('#up-arrow').addClass('hide')
    let pages = getPages();
    if (pages < 2) {
      $('#down-arrow').addClass('hide')
    } else {
      if ($('#down-arrow').hasClass('hide')) {
        $('#down-arrow').removeClass('hide');
      }
    }
  }

  const pageDown = () => {
    let top = parseInt(window.getComputedStyle(document.getElementById('stream-grid'))
      .getPropertyValue('top'));
      let pages = getPages();
    let length = 308;
    if (top < -(length * (pages-2)) && top > -(length * (pages-1))) {
      $('#stream-grid').css('top', `${-(length * (pages-1))}px`);
      $('#down-arrow').addClass('hide');
      if ($('#up-arrow').hasClass('hide')) $('#up-arrow').removeClass('hide')
    }
    else if (top >= -(length * (pages-2))) {
      if (top === -(length * (pages-2))) $('#down-arrow').addClass('hide')
      $('#stream-grid').css('top', `${top - length}px`);
      if ($('#up-arrow').hasClass('hide')) $('#up-arrow').removeClass('hide')
    }
  }

  const pageUp = () => {
    let top = parseInt(window.getComputedStyle(document.getElementById('stream-grid'))
    .getPropertyValue('top'));
    let length = -308;
    if (top < 0 && top > length) {
      $('#stream-grid').css('top', '0');
      $('#up-arrow').addClass('hide');

      if ($('#down-arrow').hasClass('hide')) $('#down-arrow').removeClass('hide')
    }
    else if (top <= length) {
      if (top === length) $('#up-arrow').addClass('hide')
      $('#stream-grid').css('top', `${top - length}px`);
      if ($('#down-arrow').hasClass('hide')) $('#down-arrow').removeClass('hide')
    }
  }

  // $('body').mousemove( () => console.log($('#stream-grid').css('width')));

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
      <span id='pages' >
        <span id='down-arrow' className='arrow-span'>
          <IoCaretDownOutline className='arrow' onClick={() => pageDown()} />
        </span>
        <span id='up-arrow' className='arrow-span hide'>
          <IoCaretUpOutline className='arrow' onClick={() => pageUp()} />
        </span>
      </span>
    </div>
  );
};

export default StreamStore;
