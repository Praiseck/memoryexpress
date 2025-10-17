import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
  },
  right: {
    alignItems: 'flex-end',
    marginEnd: 10,
  },
  preview: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  frame: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
  },
  nick: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffffff',
    alignItems: 'center',
  },
  coins: {
    fontSize: 14,
    color: '#008a00ff',
  },
  level: {
    fontSize: 14,
    color: '#fffbfbff',
    marginTop: 4,
  },
});