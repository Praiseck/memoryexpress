import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  preview: {
    position: 'relative',
    width: 85,
    height: 85,
    marginBottom: 12,
  },
  frame: {
    position: 'absolute',
    width: 85,
    height: 85,
    resizeMode: 'contain',
  },
  avatar: {
    position: 'absolute',
    width: 85,
    height: 85,
    resizeMode: 'contain',
    
  },
  nick: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  coins: {
    fontSize: 18,
    color: '#FFD700',
    fontWeight: '600',
    marginTop: 4,
  },
});