import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingTop: 45,
    justifyContent: 'space-between',
  },
  playButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 25,
    borderRadius: 10,
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  playText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  loading: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 350,
  },
  actions: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 60,
  },
  banner: {
    height: 60,
    backgroundColor: '#ada7a7ff',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  motivationText: {
    fontSize: 14,
    color: '#ffffffff',
    marginTop: 8,
    textAlign: 'center',
  }

});