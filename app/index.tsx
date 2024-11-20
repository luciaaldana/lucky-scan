import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.text}>Content is in safe area.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});
