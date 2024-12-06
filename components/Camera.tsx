import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';

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
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={'back'} ref={cameraRef} autofocus="on" />
      <Text style={styles.text}>{ticketNumbers.map((number) => number + ' ')}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={__takePicture}>
          <Text style={styles.text}>TAKE PHOTO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    height: 50,
    width: 300,
    alignSelf: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});
