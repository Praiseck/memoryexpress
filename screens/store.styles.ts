import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#1d1d1dff',
    marginBottom: 60,
  },
  loading: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#ffffffff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  item: {
    width: '30%',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 8,
    elevation: 2,
  },
  itemDisabled: {
    opacity: 0.5, // ✅ reduce visibilidad
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#333',
  },
  owned: {
    fontSize: 14,
    color: 'green', // ✅ color distintivo
    fontWeight: 'bold',
  },
  videoButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 2,
  },
  videoText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  videoCounter: {
    textAlign: 'center',
    fontSize: 16,
    color: '#ffffffff',
  },
  bonusText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#d35400',
    fontWeight: 'bold',

  },
  levelTag: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#222',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    zIndex: 2,
  },
  levelText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  switchLabel: {
    fontSize: 14,
    marginRight: 8,
    color: '#ffffffff',
  },
  adBanner: {
    height: 80,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  adText: {
    fontSize: 12,
    color: '#555',
  },

  expandText: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 14,
    color: '#007AFF',
  },

  rewardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 16,
  },
});