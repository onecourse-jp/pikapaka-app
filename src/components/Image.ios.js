import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { CachedImage } from '@georstat/react-native-image-cache';
import FastImage from 'react-native-fast-image';
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
  const [error, setError] = useState(false);
  // console.log(
  //   'placeholder',
  //   Image.resolveAssetSource(placeholder).uri,
  //   source.uri,
  // );
  return (
    <>
      {Platform.OS === 'ios' && (
        <>
          <FastImage
            style={[style]}
            source={{
              uri:
                source.uri && source.uri.length > 0
                  ? source.uri
                  : Image.resolveAssetSource(placeholder).uri,
            }}
            resizeMode={FastImage.resizeMode.cover}
            onLoadEnd={() => {
              // console.log('onLoadend', source.uri);
              setLoaded(true);
            }}
            onError={() => {
              // console.log('onLoaderror', source.uri);
              setLoaded(false);
              setError(true);
            }}
            onProgress={() => {}}
            LoadingIndicatorComponent={ActivityIndicator}
          />

          {!loaded && (
            <FastImage
              style={[style, StyleSheet.absoluteFill]}
              source={{
                uri: Image.resolveAssetSource(placeholder).uri
                  ? Image.resolveAssetSource(placeholder).uri
                  : Image.resolveAssetSource(
                      require('@assets/images/avatar_default.png'),
                    ).uri,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
          {!loaded && !error && (
            <ActivityIndicator style={[StyleSheet.absoluteFill]} />
          )}
        </>
      )}
    </>
  );
}
{
}
