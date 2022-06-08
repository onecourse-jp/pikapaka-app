/**
 * @format
 */
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { AppRegistry, Platform } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { enableScreens } from 'react-native-screens';
import { CacheManager } from '@georstat/react-native-image-cache';

var RNFS = require('react-native-fs');

if (Platform.OS !== 'web') {
  CacheManager.config = {
    baseDir: `${RNFS.CachesDirectoryPath}/images_cache/`,
    blurRadius: 0,
    sourceAnimationDuration: 0,
    thumbnailAnimationDuration: 0,
  };
}

enableScreens();
AppRegistry.registerComponent(appName, () => App);

if (Platform.OS === 'android') {
  AppRegistry.registerHeadlessTask(
    'RNCallKeepBackgroundMessage',
    () =>
      ({ name, callUUID, handle }) => {
        // Make your call here
        console.log('RNCallKeepBackgroundMessage');
        return Promise.resolve();
      },
  );
}
