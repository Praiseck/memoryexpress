import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 20,
    justifyContent: 'space-between',
  },
  playButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 30,
    borderRadius: 10,
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
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
    marginTop: 400,
  },
  
  bannerPlaceholder: {
    height: 60, // espacio estimado para el banner
    marginTop: 0,
    backgroundColor: '#867b7bff', // color de fondo temporal
  },


});