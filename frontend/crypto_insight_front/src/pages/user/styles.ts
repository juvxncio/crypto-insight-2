import { StyleSheet } from 'react-native';
import { themas } from '../../global/themes';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 250,
    backgroundColor: themas.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  logoutIcon: {
    width: 30,
    height: 30,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -140,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: themas.colors.primary,
  },
  username: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    top: -50
  },
  favoritesContainer: {
    flex: 1,
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  favoritesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  cryptoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 10,
    width: '100%',
  },
  cryptoName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});
