import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from 'react-navigation';
import LoginScreen from './components/LoginScreen.jsx';
import HomeScreen from './components/HomeScreen.jsx';

// REDUX
import store from './store/store.js';
import UserForm from './store/user-form.js';


const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
            name="StreamFinder"
            component={HomeScreen}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
