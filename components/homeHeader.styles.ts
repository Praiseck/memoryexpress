import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
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
    top: 5,
    left: 5,
    zIndex: 1,
  },
  frame: {
    width: 60,
    height: 60,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  },
  nick: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  coins: {
    color: '#ffd700',
    fontSize: 16,
    fontWeight: 'bold',
  },
});