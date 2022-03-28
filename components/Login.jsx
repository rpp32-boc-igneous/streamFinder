import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Login() {
  return (
    <View style={styles.login}>
      <Text style={styles.text}>Login</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  login: {
    display: 'inline-block',
    width: 50,
    borderColor: '#0a0a0a',
    borderWidth: 2,
    padding: 5,
    borderRadius: 4,
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'rgba(50, 5, 255, 1)',
  }
});