import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  nickStatus: {
    fontSize: 14,
    marginBottom: 12,
    color: '#ccc',
    textAlign: 'center',
  },

  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  preview: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
  },

  avatar: {
    width: 90, // ← más pequeño para que el marco lo rodee
    height: 90,
    borderRadius: 45,
    position: 'absolute',
    zIndex: 1,
  },

  frame: {
    width: 120,
    height: 120,
    position: 'absolute',
    zIndex: 2,
  },

  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    width: '80%',
    marginBottom: 20,
  },
  section: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 10,
    fontWeight: '600',
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 20,
  },
  optionImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
  },
  selected: {
    borderColor: '#4CAF50',
    borderWidth: 3,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});