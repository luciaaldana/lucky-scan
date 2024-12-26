import { StyleSheet, Text, View } from 'react-native';
import globalStyles from '../styles/global';

type TLotteryResultsProps = {
  numbers: number[];
  data: {
    [key: string]: number[];
  };
};

export default function LotteryResults({ numbers, data }: TLotteryResultsProps) {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Tus números</Text>
      {numbers && (
        <Text style={globalStyles.text}>{numbers.map((num: number) => (num < 10 ? `0${num}` : num)).join(' - ')}</Text>
      )}
      <Text style={globalStyles.title}>Resultados QUINI 6</Text>
      {data &&
        Object.keys(data).map((key) => (
          <View style={styles.resultList}>
            <View>
              <Text key={key} style={[globalStyles.text, styles.boldText]}>
                {key}
              </Text>
            </View>
            <View style={styles.wrapperResult}>
              {data[key].map((num: number) => {
                const number = num < 10 ? `0${num}` : num;
                if (numbers.includes(num)) {
                  return (
                    <Text key={num} style={[globalStyles.text, styles.sameNumber]}>
                      {number}
                    </Text>
                  );
                }
                return (
                  <Text key={num} style={[globalStyles.text, { padding: 4, marginHorizontal: 4 }]}>
                    {number}
                  </Text>
                );
              })}
            </View>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  resultList: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  boldText: {
    fontWeight: 'bold',
  },
  wrapperResult: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sameNumber: {
    backgroundColor: '#4dba7a',
    padding: 4,
    borderRadius: 50,
    fontWeight: 'bold',
    marginHorizontal: 4,
  },
});
