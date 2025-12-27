import cn from 'clsx';
import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
interface CustomButtonProps {
  onPress: () => void;
  title: string;
  style?: StyleProp<TouchableOpacityProps>;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  isLoading?: boolean;
}

const CustomButton = ({
  onPress,
  title = 'Click Me',
  style,
  textStyle,
  leftIcon,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity className={cn('custom-btn', style)} onPress={onPress}>
      {leftIcon}
      <View>
        {isLoading ? (
          <ActivityIndicator size={'small'} color={'white'} />
        ) : (
          <Text className={cn('text-white-100 paragraph-semibold', textStyle)}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
