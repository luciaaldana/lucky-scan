import { StyleSheet, Text, View } from 'react-native';
import { minNecessaryLotteryHits } from '@/constants';
import { IResultsCard } from '@/types';
import globalStyles from '../styles/global';

const LotteryResultCard = ({ lotteryHits, name, numbers, dataWithPozoExtra }: IResultsCard) => {
  const ThereAreLotteryHits = lotteryHits && lotteryHits >= minNecessaryLotteryHits[name];

  return (
    <View style={globalStyles.card}>
      <View style={styles.wrapperTitle}>
        <Text key={name} style={[globalStyles.text, styles.boldText]}>
          {name?.replace('_', ' ')}
        </Text>
        <View
          style={[globalStyles.tag, ThereAreLotteryHits ? globalStyles.tagSuccess : globalStyles.tagError, styles.tag]}
        >
          <Text>{ThereAreLotteryHits ? 'Con premio' : 'Sin premio'}</Text>
        </View>
      </View>
      <View style={styles.wrapperResult}>
        {dataWithPozoExtra[name].map((num: number) => (
          <Text key={`${name}-${num}`} style={[globalStyles.text, numbers.includes(num) && globalStyles.matchedBall]}>
            {num < 10 ? `0${num}` : num}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default LotteryResultCard;

const styles = StyleSheet.create({
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
  tag: {
    position: 'absolute',
    top: -16,
    right: 16,
  },
});
