import { Input, FormControl } from "native-base";

interface InputProps {
  label?: string;
  placeholder: string;
  secureTextEntry?: boolean;
  leftIcon?: React.ReactNode;
  value: string;
  onChangeText: (text: string) => void;
}

export function EntradaTextoCadastro ({ 
  label, 
  placeholder, 
  secureTextEntry = false,
  value,
  onChangeText,
} : InputProps) : JSX.Element {
  return (
    <FormControl mt={3}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <Input
        placeholder={placeholder}
        size="lg"
        w="100%"
        borderRadius="lg"
        bgColor="gray.100"
        secureTextEntry={secureTextEntry}
        value={value}
        shadow={3}
        onChangeText={onChangeText}
      />
    </FormControl>
  );
};