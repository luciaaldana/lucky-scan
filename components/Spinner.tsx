import { ActivityIndicator, View } from 'react-native';
import globalStyles from '../styles/global';

export default function Spinner() {
  return (
    <View style={globalStyles.container}>
      <ActivityIndicator color="#4dba7a" size="large" />
    </View>
  );
}
