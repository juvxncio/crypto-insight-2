import { StyleSheet, Dimensions } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    header:{
        width:'100%',
        height:Dimensions.get('window').height/6,
        backgroundColor:themas.colors.primary,
        paddingHorizontal:20,
        justifyContent:'center'
    },
    greeting:{
        fontSize:20,
        color:'#FFF',
        marginTop:20,
    },
    boxInput:{
        width:'80%'
    },
    boxList:{
        flex:1,
        width:'100%'
    },
    cryptoItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    cryptoIcon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    cryptoInfo: {
        flex: 1,
    },
    cryptoName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    cryptoPrice: {
        fontSize: 14,
        color: "#666",
    },
    cryptoChange: {
        fontSize: 14,
        fontWeight: "bold",
    },
})