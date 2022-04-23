import axios from 'axios';
import React from 'react';
import $ from 'jquery';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let value = e.target.value;
    this.setState({
      text: value
    })
  }

  search() {
    var searchTerm = this.state.text;
    this.props.updateTerm(searchTerm);
    let options = {
      method: 'post',
      url: 'http://127.0.0.1:3000/search',
      data: {
        query: searchTerm
      },
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
    axios(options)
      .then(result => {
        this.props.cb(result.data);
        $('#search-input').val('');
        this.setState({
          text: ''
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    let { text } = this.state;
    return (
      <div id='search'>
        <div id='search-box'>
          <input type='text' placeholder='Search for a movie or TV show'
            value={this.state.text}
            onChange={this.handleChange}
            id='search-input'></input>
          <button title='search' onClick={this.search} id='search-button'>Search</button>
        </div>
      </div>
    );
  }
}

export default Search;
