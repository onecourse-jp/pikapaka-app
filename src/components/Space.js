import React from 'react';
import { View, Text, Pressable } from 'react-native';

export default function SpaceComponent({
  children,
  size = 10,
  direction = 'column',
  style,
  onPress,
}) {
  let viewStyle = { marginBottom: size };
  if (direction === 'row') {
    viewStyle = { marginRight: size };
  }
  return (
    <Pressable
      style={{ ...style, ...{ flexDirection: direction } }}
      onPress={onPress}>
      {children &&
        children.map((el, index) => {
          return (
            <View key={index.toString()} style={viewStyle}>
              {el}
            </View>
          );
        })}
    </Pressable>
  );
}
