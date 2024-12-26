import { StyleSheet, Text, View } from 'react-native';
import globalStyles from '../styles/global';
import { Link } from 'expo-router';

type TLotteryResultsProps = {
  numbers: number[];
  data: {
    [key: string]: number[];
  };
};

export default function LotteryResults({ numbers, data }: TLotteryResultsProps) {
  const pozoExtra = [
    ...new Set(
      Object.keys(data || {})
        .filter((key) => key !== 'SIEMPRE_SALE')
        .flatMap((key) => (Array.isArray(data[key]) ? data[key] : []))
    ),
  ].sort((a, b) => a - b);

  const dataWithPozoExtra = {
    ...data,
    POZO_EXTRA: pozoExtra,
  };

  const lotteryHits = data
    ? Object.keys(dataWithPozoExtra).reduce((acc, key) => {
        const hits = dataWithPozoExtra[key]?.filter((num) => numbers.includes(num)).length || 0;
        return { ...acc, [key]: hits };
      }, {})
    : {};

  const minNecessaryLotteryHits = {
    LA_SEGUNDA: 4,
    TRADICIONAL: 4,
    REVANCHA: 6,
    SIEMPRE_SALE: 5,
    POZO_EXTRA: 6,
  };

  return (
    <View style={[globalStyles.container, globalStyles.bg, styles.wrapper]}>
      {numbers && (
        <View style={styles.numbersContainer}>
          <Text style={globalStyles.text}>
            {numbers.map((num: number) => (num < 10 ? `0${num}` : num)).join(' - ')}
          </Text>
        </View>
      )}
      <View style={[globalStyles.container, styles.container]}>
        {dataWithPozoExtra &&
          Object.keys(dataWithPozoExtra).map((key) => {
            const ThereAreLotteryHits = lotteryHits[key] >= minNecessaryLotteryHits[key];

            return (
              <View style={styles.resultList}>
                <View style={styles.wrapperTitle}>
                  <Text key={key} style={[globalStyles.text, styles.boldText]}>
                    {key.replace('_', ' ')}
                  </Text>
                  <View style={[ThereAreLotteryHits ? globalStyles.tagSuccess : globalStyles.tagError, styles.tag]}>
                    <Text>{ThereAreLotteryHits ? 'Con premio' : 'Sin premio'}</Text>
                  </View>
                </View>
                <View style={styles.wrapperResult}>
                  {dataWithPozoExtra[key].map((num: number) => {
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
            );
          })}
      </View>
      <View style={styles.wrapperBtn}>
        <Link
          href={{
            pathname: '/',
          }}
          style={[globalStyles.buttonSecondary, styles.button]}
        >
          <Text style={globalStyles.label}>Inicio</Text>
        </Link>
        <Link
          href={{
            pathname: '/photo',
          }}
          style={[globalStyles.button, styles.button]}
        >
          <Text style={globalStyles.label}>Volver</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  container: {
    padding: 0,
  },
  resultList: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    paddingVertical: 8,
    borderRadius: 50,
    backgroundColor: '#f5f5f5',
  },
  numbersContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    marginBottom: 32,
    paddingVertical: 8,
    paddingTop: 16,
    borderRadius: 50,
    backgroundColor: '#a8debf',
  },
  wrapperTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  boldText: {
    fontWeight: 'bold',
    marginBottom: 0,
    marginRight: 8,
  },
  wrapperResult: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  sameNumber: {
    backgroundColor: '#a8debf',
    padding: 4,
    borderRadius: 50,
    fontWeight: 'bold',
    marginHorizontal: 4,
  },
  tag: {
    position: 'absolute',
    top: -16,
    right: 16,
  },
  wrapperBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  button: {
    marginTop: 16,
    width: '48%',
  },
});
