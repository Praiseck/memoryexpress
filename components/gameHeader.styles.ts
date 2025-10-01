import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  preview: {
    width: 60,
    height: 60,
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    zIndex: 1,
  },
  frame: {
    width: 60,
    height: 60,
    position: 'absolute',
    zIndex: 2,
  },
  nick: {
    color: '#fff',
    fontSize: 16,
  },
  coins: {
    color: '#ffd700',
    fontSize: 16,
    fontWeight: 'bold',
  },
});