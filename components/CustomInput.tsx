import cn from 'clsx';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  label: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
}

const CustomInput = ({
  placeholder = 'Enter Text',
  value,
  onChangeText,
  label,
  secureTextEntry = false,
  keyboardType = 'default',
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className="w-full">
      <Text className="label">{label}</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={'#888'}
        className={cn(
          'input',
          isFocused ? 'border-primary' : 'border-gray-300',
        )}
      />
    </View>
  );
};

export default CustomInput;
