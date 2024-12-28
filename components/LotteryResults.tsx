import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import LotteryResultCard from './LotteryResultCard';
import { ROUTES } from '@/constants';
import { TLotteryHits, TLotteryResultsProps } from '@/types/index';
import globalStyles from '@/styles/global';

export default function LotteryResults({ numbers, data }: TLotteryResultsProps) {
  const pozoExtra = [
    ...new Set(
      Object.keys(data || {})
        .filter((key) => key !== 'SIEMPRE_SALE')
        .flatMap((key) => (Array.isArray(data[key]) ? data[key] : []))
    ),
  ].sort((a, b) => a - b);

  const dataWithPozoExtra: { [key: string]: number[] } = {
    ...data,
    POZO_EXTRA: pozoExtra,
  };

  const lotteryHits: TLotteryHits = data
    ? Object.keys(dataWithPozoExtra).reduce((acc, key) => {
      const hits = dataWithPozoExtra[key]?.filter((num) => numbers.includes(num)).length || 0;
      return { ...acc, [key]: hits };
    }, {})
    : {};

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
          Object.keys(dataWithPozoExtra).map((key) => (
            <LotteryResultCard
              dataWithPozoExtra={dataWithPozoExtra}
              name={key}
              key={key}
              numbers={numbers}
              lotteryHits={lotteryHits[key]}
            />
          ))}
      </View>
      <View style={styles.wrapperBtn}>
        <Link href={ROUTES.HOME} style={[globalStyles.buttonSecondary, styles.button]}>
          <Text style={globalStyles.label}>Inicio</Text>
        </Link>
        <Link href={ROUTES.PHOTO} style={[globalStyles.button, styles.button]}>
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
