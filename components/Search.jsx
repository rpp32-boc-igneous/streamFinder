import axios from 'axios';
import React from 'react';

class Search extends React.Component {
  constructor() {
    super();
    this.state={
      text: ''
    };
    this.search = this.search.bind(this);
  }

    search() {
      var options = {
        method: 'get',
        // url: 'http://127.0.0.1:3000/search',
        url: 'http://192.168.1.151:3000/search',
        headers: {
          accept: 'aplication/json',
          'Content-Type': 'application/json'
        }
      }
      axios(options)
      .then(result => {
        alert(result.data);
        console.log(JSON.stringify(result.data));
      })
      .catch(err => {
        console.log(err);
      })
    }

    render() {
      let {text} = this.state;
      return (
        <div id="search">
          <div id="searchBox">
            <input type="text" placeholder="Search for a movie or TV show"
              value={this.state.text}
              onChange={(text) => this.setState({text})}
              id="searchInput"></input>
              <button title="search" onClick={this.search} id="searchButton">Search</button>
          </div>
        </div>
      );
    }
}

export default Search;
