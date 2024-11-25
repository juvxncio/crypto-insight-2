import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const styles = StyleSheet.create({
  button: {
    width: 320,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: themas.colors.bgScreen,
    borderColor: themas.colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 15,
  },
  textButton: {
    fontSize: 16,
    color: themas.colors.primary,
    fontWeight: "bold",
  },
});