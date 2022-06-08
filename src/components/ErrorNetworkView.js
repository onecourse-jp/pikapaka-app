import React, { useEffect, useState } from 'react';
import { EventEmitter } from 'events';
import { View, Text } from 'react-native';
import bus from '@utils/eventBus';
export default function ErrorNetworkView({ autoTracking = true }) {
  const [isDisplay, setIsDisplay] = useState(!global.socket.connected);
  console.log('socket is conneted', global.socket.connected);
  const netWorkOn = () => {
    console.log('socket.on');
    setIsDisplay(false);
  };
  const netWorkOff = () => {
    console.log('socket.off');
    setIsDisplay(true);
  };
  useEffect(() => {
    bus.on('socket.on', netWorkOn);
    bus.on('socket.off', netWorkOff);
    return () => {
      bus.off('socket.on', netWorkOn);
      bus.off('socket.off', netWorkOff);
    };
  }, []);
  return (
    <View>
      {isDisplay && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            backgroundColor: 'red',
            zIndex: 999,
            right: 0,
            left: 0,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 4,
          }}>
          <Text style={{ color: 'white' }}>{global.t('no_network')}</Text>
        </View>
      )}
    </View>
  );
}
