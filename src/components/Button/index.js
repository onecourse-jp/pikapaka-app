import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import globalStyles from '@config/styles';
import MoreButton from './MoreButton';
export default function Button({
  onPress,
  text,
  textStyle,
  style,
  icon,
  rightIcon,
  parentStyle,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        opacity: disabled ? 0.8 : 1,
        ...parentStyle,
      }}>
      <View
        style={{
          flex: 1,
          height: 40,
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: globalStyles.color.COLOR_PRIMARY,

          ...style,
        }}>
        {icon && <Image source={icon}></Image>}
        <Text
          style={{
            textAlign: 'center',
            color: globalStyles.color.COLOR_WHITE,
            ...textStyle,
          }}>
          {text}
        </Text>
      </View>
      {rightIcon && <Image source={rightIcon} style={{ marginRight: 30 }} />}
    </TouchableOpacity>
  );
}
export { MoreButton };
