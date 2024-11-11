import { Input, FormControl, HStack } from "native-base";
import React from "react";

interface InputProps {
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

export function EntradaTextoLogin({
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
}: InputProps): JSX.Element {
  return (
    <FormControl mt={3}>
      <HStack space={1} justifyContent={'center'} alignItems={'center'}>
        <Input
          placeholder={placeholder}
          size={'lg'}
          w={'90%'}
          borderRadius={'lg'}
          backgroundColor={'#ffff'}
          variant={"underlined"}
          borderColor={'#00213D'}
          paddingLeft={2}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
        />
      </HStack>
    </FormControl>
  );
}
