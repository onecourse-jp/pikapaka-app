import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export default function RoundButton({
  source,
  activeBackgroundColor = 'rgba(255,255,255,0.5)',
  active,
  onPress = () => {},
  style,
  typeMute = false,
  disable = false,
}) {
  // console.log('active', active);
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disable}
      style={{
        width: 80,
        height: 80,
        backgroundColor: active
          ? activeBackgroundColor
          : 'rgba(255,255,255,0.3)',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        ...style,
      }}>
      <Image
        source={source}
        style={{
          tintColor: active ? 'white' : 'rgba(0,0,0,0.5)',
          height: 32,
          width: 32,
        }}
        resizeMode="cover"
      />
      {!active && typeMute && (
        <View
          style={{
            width: 60,
            height: 3,
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'absolute',
            bottom: 40,
            zIndex: 10,
            left: 10,
            transform: [{ rotate: '-60deg' }],
          }}></View>
      )}
    </TouchableOpacity>
  );
}
