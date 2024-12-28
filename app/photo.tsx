import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Camera from '@/components/Camera';
import DataConfirmation from '@/components/DataConfirmation';
import { TLotteryTicket } from '@/types';
import globalStyles from '../styles/global';

export default function Photo() {
  const [lotteryTicket, setLotteryTicket] = useState<TLotteryTicket>({ image: '', numbers: [] });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e0f3e8' }}>
      <View style={[globalStyles.container, styles.container]}>
        {lotteryTicket.numbers.length === 0 ? (
          <Camera lotteryTicket={lotteryTicket} setLotteryTicket={setLotteryTicket} />
        ) : (
          <DataConfirmation setLotteryTicket={setLotteryTicket} lotteryTicket={lotteryTicket} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
});
