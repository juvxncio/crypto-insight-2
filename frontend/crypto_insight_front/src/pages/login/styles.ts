import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    boxTop:{
        height: Dimensions.get('window').height/3,
        width:'100%',
        // backgroundColor: 'red',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:-30,
        marginTop:-40
    },
    boxMid:{
        height: Dimensions.get('window').height/4,
        width:'100%',
        // backgroundColor: 'green',
        paddingHorizontal:37
    },
    boxBottom:{
        height: Dimensions.get('window').height/3,
        width:'100%',
        // backgroundColor: 'blue',
        alignItems:'center',
        marginBottom:-200
    },
    logo:{
        width:290,
        height:250
    },
    boxInput:{
        width:'100%',
        height:40,
        marginTop:20,
        flexDirection:'row-reverse',
        alignItems:'center',
        paddingHorizontal:1,
    },
    input:{
        height:'100%',
        width:'90%',
        borderBottomWidth: 2,
        borderBottomColor:themas.colors.primary,
        marginLeft:7,
        fontSize:16,
    },
    button:{
        width:320,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:themas.colors.primary,
        borderRadius:10,
        marginTop:-40,
    },
    textButton:{
        fontSize:16,
        color:themas.colors.bgScreen,
        fontWeight:'bold',
    },
    textBottom:{
        fontSize:16,
        color:themas.colors.gray
    }
})