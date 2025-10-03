import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', //
    backgroundColor: '#121212',
    paddingTop: 16,
    paddingBottom: 80,
  },
  status: {
    alignItems: 'center',
    marginBottom: 16,
  },
  level: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    width: '80%',
    backgroundColor: '#333',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
  },
  progressText: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 8,
  },
  streak: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  earned: {
    fontSize: 16,
    color: '#00FFAA',
    marginBottom: 8,
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sequenceBlock: {
    marginBottom: 24,
  },
  sequence: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: 12,
    width: '95%',
  },
  emoji: {
    fontSize: 32,
  },
  questionBlock: {
    alignItems: 'center',
  },
  question: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap', // 👈 permite múltiples filas
    justifyContent: 'center',
    gap: 12,
    marginTop: 16,
    paddingHorizontal: 8,
  },

  option: {
    backgroundColor: '#555',
    padding: 12,
    borderRadius: 8,
    width: '45%', // 👈 para que quepan 2 por fila
    alignItems: 'center',
    marginBottom: 12,
  },

  levelUpMessage: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    backgroundColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 6,
    zIndex: 10,
  },
  levelUpText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  bannerPlaceholder: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    backgroundColor: '#b39f9fff', // o transparente si el banner lo cubre
  },
});