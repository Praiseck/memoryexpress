import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: 15,
  },
  preview: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  frame: {
    width: 120,
    height: 120,
    position: 'absolute',
    zIndex: 2,
  },

  nick: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },

  coins: {
    fontSize: 16,
    color: '#ffd700',
  },
  headerCompact: {
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  frameCompact: {
    width: 90,
    height: 90,
  },
  nickCompact: {
    fontSize: 14,
  },
  coinsCompact: {
    fontSize: 14,
    marginTop: 2,
  },

});