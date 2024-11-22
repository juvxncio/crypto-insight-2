import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 250,
    backgroundColor: themas.colors.primary,
    position: "relative",
  },
  logoutButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  logoutIcon: {
    width: 30,
    height: 30,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: -150,
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
    fontWeight: "bold",
    color: "#FFF",
    position: "absolute",
    top: -50,
    zIndex: 1,
  },
  favoritesContainer: {
    flex: 1,
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  favoritesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  cryptoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    borderRadius: 10,
    width: "100%",
  },
  cryptoName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  cryptoPrice: {
    fontSize: 16,
    color: "#666",
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
});
