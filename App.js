import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Carousel from './components/Carousel.jsx';
import Login from './components/Login.jsx';
import Search from './components/Search.jsx';
import Menu from './components/Menu.jsx';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Search />
        <Login />
      </View>
      <Menu />
      <Carousel />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    display: 'flex',
  }
});
