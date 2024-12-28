import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { ROUTES } from '@/constants';
import globalStyles from '../styles/global';

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e0f3e8' }}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Tu asistente para verificar resultados de lotería Quini 6.</Text>
        <Text style={globalStyles.text}>
          ¿Alguna vez has deseado una forma rápida y precisa de comprobar tus números de lotería? Con{' '}
          <Text style={globalStyles.appName}>LuckyScan</Text>, simplemente toma una foto de tu boleta y nuestra
          aplicación se encargará del resto.
        </Text>
        <Link href={ROUTES.PHOTO} style={[globalStyles.button, styles.button]} onPress={() => {}}>
          <Text style={globalStyles.label}>Tomar foto de mi boleta</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 48,
  },
});
