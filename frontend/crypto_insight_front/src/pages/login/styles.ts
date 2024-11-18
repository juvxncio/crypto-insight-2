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
        marginBottom:-30,
        marginTop:-40
    },
    boxMid:{
        height: Dimensions.get('window').height/4,
        width:'100%',
        paddingHorizontal:37,
        marginBottom:15
        
    },
    boxBottom:{
        height: Dimensions.get('window').height/3,
        width:'100%',
        alignItems:'center',
        marginBottom:-200
    },
    logo:{
        width:290,
        height:250
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