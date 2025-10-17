import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 20,
    paddingBottom: 80,
  },
  loading: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  highlight: {
    backgroundColor: '#2e2e2e',
    borderRadius: 8,
  },
  userItem: {
    backgroundColor: '#2e2e2e',
    borderRadius: 8,
    marginBottom: 20,
  },
  position: {
    fontSize: 16,
    color: '#fff',
    width: 30,
    textAlign: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  nick: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
  streak: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginRight: 20,
  },
  banner: {
    height: 60,
    backgroundColor: '#ada7a7ff',
    width: '100%',
    bottom: 0,
    marginBottom: -60,
  },
});