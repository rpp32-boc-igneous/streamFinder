import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Search() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search</Text>
      <StatusBar style="auto" />
    </View>
  );
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
    justifyContent: 'center',
  },
  text: {
    color: 'rgba(50, 5, 255, 1)',
  }
});