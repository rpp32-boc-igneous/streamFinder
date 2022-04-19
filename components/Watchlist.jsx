import React from 'react';
import $ from 'jquery';
import ListItems from './Watchlist/ListItems.jsx';
import Dropdown from './Watchlist/Dropdown.jsx';
import Content from './Watchlist/example_data.js';
import Genres from './Watchlist/genres.js';
import arrow from '../assets/Arrow.png';

class Watchlist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      watch_list: Content.watch_list,
      watch_history: Content.watch_history,
      current_list_name: 'Watch List',
      current_list_data: Content.watch_list,
      current_list_type: 'Movies & Shows',
      genres: Genres.genres,
      currentIndex: 0
    }
    this.removeItem = this.removeItem.bind(this);
    this.updateList = this.updateList.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.closeWatchlist = this.closeWatchlist.bind(this);
    this.updateList = this.updateList.bind(this);
    this.updateIndex = this.updateIndex.bind(this);
  }

  closeWatchlist(e){
    if (e.target.tagName !== 'BUTTON') {
      $(`#Watchlist-page`).css({ display: 'none' });
      $('#carousel').css({ display: 'inline-block' });
      $('#footer').css({ display: 'flex' });
      $('#banner-box').css({ display: 'flex' });
      this.props.displaySelectedTitle(1);
    }
  }

  /** This method will remove the selected video from the user account
   */
  removeItem(e){
    var optionSelected = Number(e.target.value);
    var targetIndex, currItem, newList;
    var index = 0;

    var removeInfo = {
      list_name: this.state.current_list_name,
      video_id: optionSelected
    }

    var list_name = (this.state.current_list_name.includes('History'))
                    ? 'watch_history'
                    : 'watch_list';


    while ( targetIndex === undefined ) {
      currItem = this.state[list_name][index];
      targetIndex = (currItem.id === optionSelected)
                  ? index
                  : undefined;
      index ++;
    }
    newList = this.state[list_name];
    newList = (newList.slice(0, targetIndex)).concat(newList.slice(targetIndex + 1));
    this.setState({
      [list_name]: newList,
      current_list_data: newList
    });
    // call upon db function to remove the id from the given list
    // re-render list
  }

  /** this method changes the list that is being viewed, by dropdown selection
   */
  updateList(e) {
    var listSelected = e.target.value;
    var newList = [];
    var list_name = listSelected.includes('History')
                    ? 'watch_history'
                    : 'watch_list';
    if (this.state.current_list_type === 'Movies & Shows') {
      newList = this.state[list_name];
      this.setState({
        current_list_data: newList,
        current_list_name: listSelected
      })
    } else {
      var currentContentType = (this.state.current_list_type).includes('Movies')
                          ? 'movies'
                          : 'tv_series';
      var currentData = this.state[list_name];
      for (var item of currentData) {
        if (item.type === currentContentType) {
          newList.push(item)
        }
      }
      this.setState({
        current_list_data: newList,
        current_list_name: listSelected
      })
    }
  }

  /**
   * this method will update the rendered list by sorting content
   * (movies & shows, movies, shows)
   */
  updateContent(e) {
    var contentSelected = e.target.value;
    var currentListName = this.state.current_list_name;
    var currentListContent = currentListName.includes('History')
                          ? this.state.watch_history
                          : this.state.watch_list;
    var newList = [];

    if (contentSelected === 'Movies & Shows') {
      newList = currentListContent;
    } else if (contentSelected.includes('Shows')) {
      for (var item of currentListContent) {
        if (item.type === 'tv_series') {
          newList.push(item);
        }
      }
    } else {
      for (var item of currentListContent) {
        if (item.type === 'movie') {
          newList.push(item);
        }
      }
    }
    this.setState({
      current_list_data: newList,
      current_list_type: contentSelected
    });
  }

  /** this method moves the cards rendered according to the users clicks */
  updateIndex(e) {
    var currData = this.state.current_list_data;

    if (e.target.id === 'left') {
      var firstEl = currData.shift();
      currData.push(firstEl);
    } else {
      var lastEl = currData.pop();
      currData.unshift(lastEl);
    }

    this.setState({
      current_list_data: currData
    });
  }


  render() {
    return (
      <div>
        <div class='watch_title'>{this.state.current_list_name}</div>
        <div class='dropdownContainer'>
          <Dropdown id='list_type'
                    class='dropdown'
                    listName='Viewing'
                    values={['Watch List', 'Watch History']}
                    updateList={this.updateList}/>
          <Dropdown id='list_content'
                    class='dropdown'
                    listName='List Content'
                    values={['Movies & Shows', 'Movies Only', 'Shows Only']}
                    updateList={this.updateContent}/>
        </div>
          <ListItems  content={this.state.current_list_data}
                      index={this.state.currentIndex}
                      listName={this.state.current_list_name}
                      removeItem={this.removeItem}
                      // displaySelectedTitle={this.props.displaySelectedTitle}
                      closeWatchlist={this.closeWatchlist}
                      updateIndex={this.updateIndex}/>
          <div class='navContainer'>
            <div class='navLeft'>
              <img src={arrow} className='swiper-button-prev' onClick={this.updateIndex} id='left'></img>
            </div>
            <div class='navRight'>
              <img src={arrow} className='swiper-button-next' onClick={this.updateIndex} id='right'></img>
            </div>
          </div>
      </div>
    )
  }
}

export default Watchlist;