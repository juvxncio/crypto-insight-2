import React from "react";
import { View, TextInput, Image, TextInputProps, StyleSheet } from "react-native";
import { styles } from "./styles";

interface InputFieldProps extends TextInputProps {
  icon?: any;
  label?: string;
  placeholder: string;
  secureTextEntry?: boolean;
  leftIcon?: React.ReactNode;
  // value: string;
  // onChangeText: (text: string) => void;
}

export function InputFieldRegister({ 
  icon, 
  label, 
  placeholder, 
  secureTextEntry = false, 
  value, onChangeText,
 }: InputFieldProps) : JSX.Element {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#A3A3A3"
        value={value}
        onChangeText={onChangeText}
      />
      {icon && <Image source={icon} style={styles.icon} />}
    </View>
  );
}