import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import globalStyles from '../styles/global';

export const Guide = () => (
  <View style={styles.containerSteps}>
    <Text style={globalStyles.text}>
      Controla la fecha de tu boleta y que corresponda a la fecha de sorteo. Quini6 sortea cada Miércoles y Domingo a
      las 21 horas.
    </Text>
    <View style={styles.stepTwo}>
      <Image source={require('../assets/guide.png')} style={styles.image} />
      <Text style={[globalStyles.text, { flex: 1 }]}>
        Usa la cámara horizontal para enfocar la fila de números de tu boleta.
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  containerSteps: {
    marginBottom: 16,
  },
  stepTwo: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 8,
  },
  image: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    objectFit: 'contain',
    marginRight: 16,
  },
});
