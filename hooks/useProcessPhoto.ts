import { useState } from 'react';
import * as ImageManipulator from 'expo-image-manipulator';

interface UseProcessPhotoResult {
  processPhoto: (uri: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const findLineBeforeDollar = (text: string) => {
  const lines = text.split('\n');

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('$') && i > 0) {
      const lineBeforeDollar = lines[i - 1].trim();
      return lineBeforeDollar.replace(/[Oo]/g, '0');
    }
  }

  return null;
};

export const useProcessPhoto = (setLotteryTicket: React.Dispatch<React.SetStateAction<any>>): UseProcessPhotoResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const urlBase = process.env.EXPO_PUBLIC_API_URL;

  const processPhoto = async (uri: string) => {
    setLoading(true);
    setError(null);

    try {
      const manipulatedPhoto = await ImageManipulator.manipulateAsync(uri, [{ resize: { width: 2600 } }], {
        base64: true,
        compress: 1,
        format: ImageManipulator.SaveFormat.JPEG,
      });

      const formData = new FormData();
      formData.append('file', {
        uri: manipulatedPhoto.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      const response = await fetch(`${urlBase}/extract-text/`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const { text } = await response.json();

      const result = findLineBeforeDollar(text);

      if (!result) {
        setError('No se encontraron números válidos en el texto extraído');
        throw new Error('No se encontraron números válidos en el texto extraído');
      }

      const numbers = result.split(' ').map((element: string) => parseInt(element, 10));
      const filteredNumbers = numbers.filter((value) => Number.isFinite(value));

      if (filteredNumbers.length < 6) {
        setError('No se encontraron suficientes números en el texto extraído');
        throw new Error('No se encontraron suficientes números en el texto extraído');
      }

      setLotteryTicket((prev) => ({
        ...prev,
        numbers: filteredNumbers,
      }));
    } catch (error) {
      setError('Ocurrió un error al procesar la foto, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return { processPhoto, loading, error, setLoading, setError };
};
