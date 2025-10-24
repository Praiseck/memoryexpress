import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  panel: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 16,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  missionBox: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  missionText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#444',
  },
  rewardText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  claimButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  claimText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  claimed: {
    marginTop: 6,
    color: '#888',
    fontSize: 14,
  },
  loading: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});