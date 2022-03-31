import React from "react";

import Login from '../components/Login.jsx';
import Search from '../components/Search.jsx';
import ResultLabel from '../components/ResultLabel.jsx';
import Carousel from '../components/Carousel.jsx';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (

      <div>
        <Login />
        <Search />
        <ResultLabel />
        <Carousel />
      </div>

    )
  }

}

export default HomeScreen;