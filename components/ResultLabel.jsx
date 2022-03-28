import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function ResultLabel() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>"results for Titanic" / "Trending"</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#0a0a0a',
    borderWidth: 2,
    padding: 5,
    borderRadius: 4,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'rgba(255, 255, 255, 1)',
  }
});