import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
    tabArea:{
        flexDirection:'row',
        height:80,
        justifyContent:'space-around',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    tabItem:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
});