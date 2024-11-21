import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    header:{
        width:'100%',
        height:250,
        backgroundColor:themas.colors.primary
    },
    profileContainer:{
        alignItems: 'center',
        marginTop: -150,
    },
    profileImage:{
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: themas.colors.primary,
    },
    username:{
        fontSize: 30,
        fontWeight: 'bold',
        color:themas.colors.primary
    },
    favoritesContainer: {
        flex: 1,
        width: '100%',
        padding: 20,
      },
      favoritesTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
      },
      cryptoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
        borderRadius: 10,
      },
      cryptoName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
      },
      cryptoPrice: {
        fontSize: 16,
        color: '#666',
      },
      emptyText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 20,
      },
})