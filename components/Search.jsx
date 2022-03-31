import axios from 'axios';
import React from 'react';

export default class Search extends React.Component {
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
        <View>
          <View>
              <TextInput
                style={styles.input}
                placeholder="Search for a movie or TV show"
                value={this.state.text}
                onChangeText={(text) => this.setState({text})}
                >
                </TextInput>
          </View>
          <StatusBar style="auto" />
          <TouchableOpacity
            style={styles.button}
            title="search"
            onPress={this.search}
          >
          <Text style={styles.text}>Search</Text>
          </TouchableOpacity>
        </View>
      );
    }
}

