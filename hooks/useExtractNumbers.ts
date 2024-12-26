import { useMemo } from 'react';

function useExtractNumbers(text: string) {
  const sequences = useMemo(() => {
    const regex = /\b(\d{2})\D*(\d{2})\D*(\d{2})\D*(\d{2})\D*(\d{2})\D*(\d{2})\b/g;
    const matches = [...text.matchAll(regex)];

    return matches
      .map((match) => {
        const numbers = match.slice(1).map(Number);
        const isAscending = numbers.every((num, i, arr) => i === 0 || num > arr[i - 1]);
        return isAscending ? numbers : null;
      })
      .filter(Boolean);
  }, [text]);

  return sequences;
}

export default useExtractNumbers;
