import { useState, useEffect } from 'react';

interface TransformedData {
  [key: string]: number[];
}

interface ServerResponse {
  tables: [string][][];
}

const useScrape = () => {
  const [data, setData] = useState<TransformedData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const urlBase = process.env.EXPO_PUBLIC_API_URL;
  const urlForScraping = process.env.EXPO_PUBLIC_SCRAPE_URL;

  const FIXED_URL = `${urlBase}/scrape/?url=${urlForScraping}`;

  const transformData = (inputData: [string][]): TransformedData => {
    const result: TransformedData = {};
    for (let i = 0; i < inputData.length; i += 2) {
      const key = inputData[i][0].replace(/\s+/g, '_');
      const values = inputData[i + 1][0].split(' - ').map((num) => parseInt(num, 10));
      result[key] = values;
    }
    return result;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(FIXED_URL);

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const result: ServerResponse = await response.json();

        const transformedData = transformData(result.tables[0]);
        setData(transformedData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [FIXED_URL]);

  return { data, loading, error };
};

export default useScrape;
