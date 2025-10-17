import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 16,
    paddingBottom: 80,
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#181818',
  },

  banner: {
    height: 60,
    backgroundColor: '#ada7a7ff',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },

  bannerPlaceholder: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    backgroundColor: '#b39f9fff',
  },

  difficultyText: {
    textAlign: 'center',
    color: '#ccc',
    fontSize: 16,
    marginTop: 0,
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
    fontSize: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: 20, // aumentado para más espacio entre emojis
    width: '95%',
  },

  emoji: {
    fontSize: 100, // aumentado para mayor impacto visual
  },
  optionEmoji: {
    fontSize: 100,
  },
  questionBlock: {
    alignItems: 'center',
  },

  question: {
    fontSize: 40,
    color: '#FFFFFF',
    marginBottom: 12,
  },

  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,

  },

  option: {
    backgroundColor: '#555',
    padding: 12,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
    marginBottom: 12,
    fontSize: 40,
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

  correct: {
    backgroundColor: '#4CAF50',
  },
  incorrect: {
    backgroundColor: '#F44336',
  },
});