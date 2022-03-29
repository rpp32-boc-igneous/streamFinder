import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from '../store/store.js';
import UserForm from '../store/user-form.js';

export default function App() {
  return (
          <View style={styles.container}>
            <View style={styles.login}>
              <Text>Username</Text>
              <Text>Password</Text>
            <StatusBar style="auto" />
            </View>
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
   login: {
     display: 'flex',
     flexDirection: 'row',
   }
 });

