import { useRef } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import globalStyles from '../styles/global';
import { useProcessPhoto } from '@/hooks/useProcessPhoto';
import { useRenderState } from '@/hooks/useRenderState';
import { Link } from 'expo-router';

export default function Camera({ lotteryTicket, setLotteryTicket }: any) {
  const [permission, requestPermission] = useCameraPermissions();
  const { processPhoto, loading, error, setError } = useProcessPhoto(setLotteryTicket);
  const cameraRef = useRef<CameraView>(null);

  const takePicture = async () => {
    if (!cameraRef.current) {
      return;
    }

    try {
      const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 1 });

      if (photo?.uri) {
        await processPhoto(photo.uri);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetLotteryTicket = () => {
    setError(null);
  };

  const content = useRenderState(loading, error, lotteryTicket, {
    error: (
      <View style={styles.container}>
        <Text style={globalStyles.text}>{error}</Text>
        <View style={styles.wrapperBtn}>
          <Link
            href={{
              pathname: '/',
              params: { numbers: JSON.stringify(lotteryTicket.numbers) },
            }}
            style={[globalStyles.buttonSecondary, styles.button]}
          >
            <Text style={globalStyles.label}>Inicio</Text>
          </Link>
          <TouchableOpacity style={[globalStyles.button, styles.button]} onPress={handleResetLotteryTicket}>
            <Text style={globalStyles.label}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </View>
    ),
    success: (
      <View style={[globalStyles.container, { paddingTop: 0 }]}>
        <View style={styles.containerSteps}>
          <Text style={globalStyles.text}>
            Controla la fecha de tu boleta y que corresponda a la fecha de sorteo. Quini6 sortea cada Miércoles y
            Domingo a las 21 horas.
          </Text>
          <View style={styles.stepTwo}>
            <Image source={require('../assets/guide.png')} style={styles.image} />
            <Text style={[globalStyles.text, { flex: 1 }]}>
              Usa la cámara horizontal para enfocar la fila de números de tu boleta.
            </Text>
          </View>
        </View>
        <View style={[globalStyles.container, { padding: 0 }]}>
          <View style={styles.containerCamera}>
            <CameraView style={styles.camera} facing={'back'} ref={cameraRef} autofocus="on" />
          </View>
          <TouchableOpacity style={globalStyles.button} onPress={takePicture}>
            <Text style={globalStyles.label}>Tomar foto</Text>
          </TouchableOpacity>
        </View>
      </View>
    ),
  });

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Necesitamos tu permiso para usar la cámara</Text>
        <TouchableOpacity style={globalStyles.button} onPress={requestPermission}>
          <Text style={globalStyles.label}>Conceder permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSteps: {
    marginBottom: 16,
  },
  stepTwo: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 8,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    marginBottom: 40,
  },
  containerCamera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    height: 250,
    width: 300,
    alignSelf: 'center',
  },
  image: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    objectFit: 'contain',
    marginRight: 16,
  },
  wrapperBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  button: {
    marginTop: 16,
    width: '48%',
  },
});
