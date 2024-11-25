import { StyleSheet } from 'react-native';
import { themas } from '../../global/themes';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        marginTop: 20,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingHorizontal: 1,
      },
      input: {
        height: '100%',
        width: '90%',
        borderBottomWidth: 2,
        borderBottomColor: themas.colors.primary,
        marginLeft: 7,
        fontSize: 16,
      },
      icon: {
        width: 24,
        height: 24,
      },
    });