import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import UserForm from './components/user-form.js'
import Login from './components/Login.jsx';
import Search from './components/Search.jsx';
import ResultLabel from './components/ResultLabel.jsx';
import Carousel from './components/Carousel.jsx';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Login />
        <Search />
      </View>
      <ResultLabel />
      <Carousel />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  }
});
