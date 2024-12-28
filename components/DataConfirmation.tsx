/* eslint-disable react-hooks/exhaustive-deps */
import { StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native';
import globalStyles from '../styles/global';
import { Link } from 'expo-router';
import { ROUTES } from '@/constants';

interface ILotteryTicket {
  image: string;
  numbers: number[];
}

interface IDataConfirmation {
  setLotteryTicket: React.Dispatch<React.SetStateAction<ILotteryTicket>>;
  lotteryTicket: ILotteryTicket;
}

export default function DataConfirmation({ setLotteryTicket, lotteryTicket }: IDataConfirmation) {
  const handleResetLotteryTicket = () => {
    setLotteryTicket({
      image: '',
      numbers: [],
    });
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <Image source={{ uri: lotteryTicket.image }} style={styles.image} />
      <Text style={globalStyles.text}>Los números de tu boleta son:</Text>
      <Text style={[globalStyles.text, styles.numbers]}>
        {lotteryTicket.numbers.map((num: number) => (num < 10 ? `0${num}` : num)).join(' - ')}
      </Text>
      <View style={styles.wrapperBtn}>
        <Pressable style={[globalStyles.buttonSecondary, styles.button]} onPress={handleResetLotteryTicket}>
          <Text style={globalStyles.label}>Reintentar</Text>
        </Pressable>
        <Link
          href={{
            pathname: ROUTES.RESULTS,
            params: { numbers: JSON.stringify(lotteryTicket.numbers) },
          }}
          style={[globalStyles.button, styles.button]}
        >
          <Text style={globalStyles.label}>Confirmar</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  image: {
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').width - 40,
    resizeMode: 'contain',
  },
  numbers: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  wrapperBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  button: {
    marginTop: 16,
    width: '48%',
  },
});
