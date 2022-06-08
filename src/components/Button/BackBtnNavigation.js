import React from 'react';
import { Image, TouchableOpacity, Platform } from 'react-native';
import Colors from '@config/styles';
import { useNavigation } from '@react-navigation/native';

export default function BackBtnNavigation() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{
        height: 32,
        width: 32,
        backgroundColor: Colors.color.COLOR_PORCELAIN,
        borderRadius: 10,
        justifyContent: 'center',
        marginLeft: Platform.OS === 'web' ? 16 : 0,
        alignItems: 'center',
      }}>
      <Image
        source={require('@assets/images/icons/ic_back.png')}
        resizeMode="cover"
        style={{
          height: 32,
          width: 32,
        }}
      />
    </TouchableOpacity>
  );
}
