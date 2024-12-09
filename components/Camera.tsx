import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import globalStyles from '../styles/global';

export default function Camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [ticketNumbers, setTicketNumbers] = useState<number[]>([]);
  const cameraRef = useRef<CameraView>(null);
  const urlBase = process.env.EXPO_PUBLIC_API_URL;

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  //TODO: MANEJAR ERRORES: CUANDO NO HAY NUMEROS ENCONTRADOS.
  // TODO: CONFIRMAR QUE LOS NÚMEROS SON CORRECTOS.
  //TODO: SUBIR IMAGEN

  const __takePicture = async () => {
    if (!cameraRef) {
      return;
    }
    try {
      const photo = await cameraRef.current?.takePictureAsync({ base64: true, quality: 1 });

      if (photo?.uri) {
        const manipulatedPhoto = await ImageManipulator.manipulateAsync(photo.uri, [{ resize: { width: 2600 } }], {
          base64: true,
          compress: 1,
          format: ImageManipulator.SaveFormat.JPEG,
        });

        const formData = new FormData();
        formData.append('image', {
          uri: manipulatedPhoto.uri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });

        const response = await fetch(`${urlBase}/ocr`, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const { text } = await response.json();

        const regex = /\b\d{2}( \d{2}){5}\b/g;
        const match = text.match(regex);

        const numbers = match[0].split(' ');

        numbers.forEach((element: string, index: number) => {
          numbers[index] = parseInt(element, 10);
        });

        setTicketNumbers(numbers);
      } else {
        console.log('No photo data found');
        throw new Error();
      }
    } catch (error) {
      //TODO:
      console.error(`${error} --`);
    }
  };

  return (
    <View style={[globalStyles.container, { paddingTop: 0 }]}>
      <View style={styles.containerSteps}>
        <Text style={globalStyles.text}>
          Controla la fecha de tu boleta y que corresponda a la fecha de sorteo. Quini6 sortea cada Miércoles y Domingo
          a las 21 horas.
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
          <Image source={require('../assets/start.png')} style={styles.halfImg} />
          <CameraView style={styles.camera} facing={'back'} ref={cameraRef} autofocus="on" />
          <Image source={require('../assets/end.png')} style={styles.halfImg} />
        </View>
        <Text style={styles.text}>{ticketNumbers.map((number) => number + ' ')}</Text>
        <TouchableOpacity style={globalStyles.button} onPress={__takePicture}>
          <Text style={globalStyles.label}>Tomar foto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  containerCamera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  halfImg: {
    width: 300,
    objectFit: 'fill',
    flex: 1,
  },
  camera: {
    height: 50,
    width: 300,
    alignSelf: 'center',
  },
  image: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    objectFit: 'contain',
    marginRight: 16,
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});
