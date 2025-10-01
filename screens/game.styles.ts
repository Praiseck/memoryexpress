import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  status: {
    marginBottom: 20,
    alignItems: 'center',
  },
  level: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  streak: {
    color: '#4CAF50',
    fontSize: 16,
  },

  gameArea: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },

  sequenceBlock: {
    alignItems: 'center',
    marginBottom: 30,
  },

  timer: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  sequence: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '95%',
  },

  emoji: {
    // El tamaño se aplica dinámicamente desde el componente
  },

  questionBlock: {
    alignItems: 'center',
    marginTop: 20,
  },

  question: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },

  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
  },

  option: {
    flex: 1,
    marginHorizontal: 3,
    paddingVertical: 12,
    backgroundColor: '#333',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24, // se puede ajustar dinámicamente si lo deseas
  },
});