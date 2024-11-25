import { StyleSheet } from 'react-native';
import { themas } from '../../global/themes';

export const styles = StyleSheet.create({
  button: {
    width: 320,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themas.colors.primary,
    borderRadius: 10,
    marginTop: -70,
  },
  textButton: {
    fontSize: 16,
    color: themas.colors.bgScreen,
    fontWeight: 'bold',
  },
});