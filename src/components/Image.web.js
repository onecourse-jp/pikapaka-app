import React, { useState } from 'react';
import { View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
// import { CachedImage } from '@georstat/react-native-image-cache';
export default function ImageF(props) {
  const {
    style,
    source,
    tintColor,
    placeholder = require('@assets/images/avatar_default.png'),
  } = props;
  const [loaded, setLoaded] = useState(false);
  const onLoadEnd = () => {
    console.log('onLoadEnd');
    setLoaded(true);
  };

  const onLoadStart = () => {
    console.log('onLoadStart');
    setLoaded(true);
  };
  const onError = () => {
    console.log('====> onError');
    setLoaded(false);
  };

  return (
    <View style={{}}>
      {source.uri ? (
        <Image
          style={[style]}
          source={source.uri}
          tintColor={tintColor}
          // onLoadEnd={onLoadEnd}
          // onError={onError}
          // onLoadStart={onLoadStart}
          // thumbnailSource={Image.resolveAssetSource(placeholder).uri}
          // thumbnailSource={Image.resolveAssetSource(placeholder).uri}
          blurRadius={0}
          resizeMode={'cover'}
        />
      ) : (
        <Image
          style={[style]}
          source={require('@assets/images/avatar_default.png')}
          tintColor={tintColor}
          blurRadius={0}
          resizeMode={'cover'}
        />
      )}
    </View>
  );
}
