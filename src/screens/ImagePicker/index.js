import React from 'react';
import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import MImagePicker from 'src/lib/react-native-image-video-picker-editor';
import { HandleCrop } from 'src/lib/react-native-image-video-picker-editor/cropper';
import RNFS from 'react-native-fs';

export default function ImagePickerScreen({ navigation, route }) {
  // TODO: add face recognition logic
  // const useFaceDetection = route?.params?.useFaceDetection ?? false;
  const {
    showCamera,
    callback,
    maxChoices = 4,
    useFaceDetection = false,
  } = route.params;
  return (
    <MImagePicker
      header={{
        nextTitle: global.t('image_picker_send'),
        cancelTitle: global.t('image_picker_cancel'),
      }}
      onCancel={() => {
        navigation.goBack();
      }}
      showCamera={showCamera}
      onNext={async (param) => {
        if (!param.selected || param.selected.length === 0) return;
        param.videoMaxLen = 3; // not set or 0 for unlimited
        param.videoQuality = 'high';
        console.log('crop param', JSON.stringify(param));
        // let images = await HandleCrop(param);
        // console.log(param)
        let images = param.photos
          .filter((item, index) => param.selected.includes(index))
          .map((e) => e.node.image.uri);
        // console.log('onNExt', images);
        // console.log('route', route);

        if (Platform.OS === 'ios') {
          const convertLocalIdentifierToAssetLibrary = (
            localIdentifier,
            ext,
          ) => {
            const hash = localIdentifier.split('/')[0];
            return `assets-library://asset/asset.${ext}?id=${hash}&ext=${ext}`;
          };

          images = await Promise.all(
            images.map(async (el) => {
              const link = convertLocalIdentifierToAssetLibrary(
                el.replace('ph://', ''),
                'jpg',
              );
              const rdName = Math.random()
                .toString(36)
                .replace(/[^a-z]+/g, '')
                .substr(0, 5);
              const destLink = RNFS.TemporaryDirectoryPath + rdName + '.jpg';
              console.log('images picker dest', link, '====> ', destLink);
              if (await RNFS.exists(destLink)) {
                await RNFS.unlink(destLink);
              }
              //
              try {
                const copy = await RNFS.copyAssetsFileIOS(link, destLink, 0, 0);
                console.log('file to compy', copy);
              } catch (e) {
                console.log('eee', e);
              }
              console.log('');
              return destLink;
            }),
          );
        }

        if (callback) {
          callback(images);
        }
        navigation.goBack();
      }}
      cropSize={{ width: 800, height: 800 }}
      maxScale={20}
      max={maxChoices}
      cameraConfig={{
        camerPhotoTile: 'Photo',
        cameraVideoTitle: 'Video',
        cameraCancelTitle: 'Cancel',
        maxVideoLen: 0,
        videoQuality: '1080p',
      }}
      // profile={true}
    />
  );
}
