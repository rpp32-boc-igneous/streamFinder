import axios from 'axios';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, TextInput, View, TouchableOpacity } from 'react-native';

// export default function Search() {
//   const testFunc = () => {
//     alert('Button Pressed');
//   }
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Search</Text>
//       <StatusBar style="auto" />
//       <Button
//         title="Test Button"
//         onPress={testFunc}
//       />
//     </View>
//   );
// }

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

const styles = StyleSheet.create({
  container: {
    borderColor: '#0a0a0a',
    borderWidth: 2,
    borderRadius: 4,
    padding: 5,
    width: 100,
    height: 50,
    marginTop: '2%',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'rgba(50, 5, 255, 1)',
  },
  button: {
    marginRight:40,
    marginLeft:40,
   marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#f5f542',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  input: {
    width: 200,
    height: 50,
    borderColor: '#0a0a0a',
    borderWidth: 2,
    borderRadius: 4,
    padding: 5,
    marginTop: '2%',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'

  }
});