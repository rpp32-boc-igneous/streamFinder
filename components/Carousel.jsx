import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Carousel() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Result Card... show times, streaming services, lowest cost option, etc.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#0a0a0a',
    borderWidth: 2,
    marginTop: 20,
    borderRadius: 4,
    height: 200,
    width: 200,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'rgba(0, 0, 0, 1)',
  }
});