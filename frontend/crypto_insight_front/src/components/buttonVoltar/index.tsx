import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { themas } from "../../global/themes";

interface ButtonProps {
  onPress: () => void;
  title: string;
  loading: boolean;
}

export function ButtonVoltar({ onPress, title, loading }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={loading}>
      {loading ? (
        <ActivityIndicator size="small" color={themas.colors.bgScreen} />
      ) : (
        <Text style={styles.textButton}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}