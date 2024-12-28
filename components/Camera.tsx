import { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useProcessPhoto } from '@/hooks/useProcessPhoto';
import { useRenderState } from '@/hooks/useRenderState';
import { Guide } from './Guide';
import { ROUTES } from '@/constants';
import { ICamera } from '@/types';
import globalStyles from '../styles/global';

export default function Camera({ lotteryTicket, setLotteryTicket }: ICamera) {
  const [permission, requestPermission] = useCameraPermissions();
  const { processPhoto, loading, error, setError } = useProcessPhoto(setLotteryTicket);
  const cameraRef = useRef<CameraView>(null);
  const [errorTakePhoto, setErrorTakePhoto] = useState('');

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
      setErrorTakePhoto('Ocurrió un error al tomar la foto. Intenta nuevamente.');
      throw new Error(`Error al tomar la foto: ${err}`);
    }
  };

  const handleResetLotteryTicket = () => {
    setError(null);
    setErrorTakePhoto('');
  };

  const cameraError = error || errorTakePhoto;

  const content = useRenderState(loading, cameraError, lotteryTicket, {
    error: (
      <View style={styles.container}>
        <Text style={globalStyles.text}>{error ? error : errorTakePhoto}</Text>
        <View style={styles.wrapperBtn}>
          <Link
            href={{
              pathname: ROUTES.HOME,
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
        <Guide />
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
