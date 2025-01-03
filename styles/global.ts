import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  bg: {
    backgroundColor: '#e0f3e8',
  },
  title: {
    fontSize: 32,
    fontWeight: 800,
    marginBottom: 10,
    fontFamily: 'NunitoSans-Bold',
  },
  appName: {
    color: '#4dba7a',
    fontFamily: 'NunitoSans-Bold',
    fontWeight: 800,
  },
  text: {
    color: '#020202',
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  label: {
    color: '#020202',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'NunitoSans-Bold',
    fontWeight: 600,
  },
  button: {
    backgroundColor: '#4dba7a',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderColor: '#020202',
    borderWidth: 2,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderColor: '#020202',
    borderWidth: 2,
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 50,
  },
  tagError: {
    backgroundColor: '#f0aaaa',
  },
  tagSuccess: {
    backgroundColor: '#a8debf',
  },
  matchedBall: {
    backgroundColor: '#a8debf',
    padding: 4,
    borderRadius: 50,
    fontWeight: 'bold',
    marginHorizontal: 4,
  },
  card: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    paddingVertical: 8,
    borderRadius: 50,
    backgroundColor: '#f5f5f5',
  },
});
