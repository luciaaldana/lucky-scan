import Camera from '@/components/Camera';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Photo() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e0f3e8' }}>
      <View style={styles.container}>
        <Camera />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
