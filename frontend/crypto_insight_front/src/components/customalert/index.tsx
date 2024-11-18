import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";

interface CustomAlertProps {
  message: string;
  type: "error" | "success";
}

export const CustomAlert: React.FC<CustomAlertProps> = ({ message, type }) => {
  return (
    <View style={[styles.alert, type === "error" ? styles.error : styles.success]}>
      <Text style={styles.alertText}>{message}</Text>
    </View>
  );
};