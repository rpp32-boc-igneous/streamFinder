import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Login() {
  return (
    <View style={styles.login}>
      <Text style={styles.text}>Login / User</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  login: {
    width: 80,
    height: 50,
    borderColor: '#0a0a0a',
    borderWidth: 2,
    padding: 5,
    borderRadius: 4,
    marginTop: '2%',
    marginRight: '40%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'rgba(50, 5, 255, 1)',
  }
});