import React from "react";
import { View, TextInput, Image, TextInputProps, StyleSheet } from "react-native";
import { styles } from "./styles";

interface InputFieldProps extends TextInputProps {
  icon?: any;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}

export function InputField({ icon, value, onChangeText, placeholder, ...rest }: InputFieldProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#A3A3A3"
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
      {icon && <Image source={icon} style={styles.icon} />}
    </View>
  );
}