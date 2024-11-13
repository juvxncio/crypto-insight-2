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
        alignItems:'center',
        justifyContent:'center',
        marginBottom:20,
        marginTop:10
    },
    textCadastro:{
        fontSize:25,
        fontWeight:'bold',
        color:themas.colors.primary
    },
    boxMid:{
        height: Dimensions.get('window').height/4,
        width:'100%',
        paddingHorizontal:37,
        marginBottom:120
    },
    boxBottom:{
        height: Dimensions.get('window').height/3,
        width:'100%',
        alignItems:'center',
        marginBottom:-200
    },
    logo:{
        width:220,
        height:250,
        marginBottom:-20
    },
    textButton:{
        fontSize:16,
        color:themas.colors.bgScreen,
        fontWeight:'bold',
    },
    textBottom:{
        fontSize:16,
        color:themas.colors.gray,
    },
    textBottomRegister:{
        fontSize:16,
        color:themas.colors.primary,
    },
    boxRegisterText:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        marginTop:-40
    }
})