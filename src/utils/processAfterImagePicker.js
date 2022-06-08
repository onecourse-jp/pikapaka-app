import React from 'react';
import { Platform, Dimensions } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import MImagePicker from 'src/lib/react-native-image-video-picker-editor';
import { HandleCrop } from 'src/lib/react-native-image-video-picker-editor/cropper';
import { hasFaceInImage } from 'src/utils/faceDetection';
import RNFS from 'react-native-fs';
import { DeviceEventEmitter } from 'react-native';
let { width, height } = Dimensions.get('window');
width = width > 600 ? 600 : width;
// const cropData = {
//   offset: { x: 0, y: (848 - 600) / 2 },
//   size: { width: 600, height: 848 },
//   displaySize: { width: 600, height: 848 },
//   resizeMode: 'cover',
// };

export const processAfterImagePicker = async (responseImages, options) => {
  // let images = await HandleCrop(param);
  // console.log(param)
  console.log('responseImages', responseImages);
  const pxNeedToAdd = 10 * responseImages.width - 7 * responseImages.height;
  console.log('responseImages', pxNeedToAdd);

  const cropData = {
    offset: {
      x:
        pxNeedToAdd < 0
          ? 0
          : (responseImages.width - responseImages.height * 0.7) / 2,
      y:
        pxNeedToAdd < 0
          ? (responseImages.height - responseImages.width / 0.7) / 2
          : 0,
    },
    size:
      pxNeedToAdd < 0
        ? {
            width: responseImages.width,
            height: responseImages.width / 0.7,
          }
        : {
            width: responseImages.height * 0.7,
            height: responseImages.height,
          },
    displaySize: { width: 600, height: 848 },
    // resizeMode: 'contain',
  };
  if (responseImages.path.startsWith('/storage')) {
    responseImages.path = 'file://' + responseImages.path;
  }
  const convertLocalIdentifierToAssetLibrary = (localIdentifier, ext) => {
    console.log('localIdentifier', localIdentifier);
    const hash = localIdentifier.split('/')[0];
    return `assets-library://asset/asset.${ext}?id=${hash}&ext=${ext}`;
  };
  let images = [];
  if (Platform.OS === 'ios') {
    images = [
      convertLocalIdentifierToAssetLibrary(
        responseImages.localIdentifier,
        'jpg',
      ),
    ];
  } else {
    let pathImage = responseImages.path;
    console.log('pathImagepathImage', pathImage);
    images = [pathImage];
  }

  console.log('onNExt', images);

  // console.log('route', route);
  const { callback, maxChoices = 4, useFaceDetection = false } = options;
  if (Platform.OS === 'ios') {
    images = await Promise.all(
      images.map(async (el) => {
        const rdName = Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, '')
          .substr(0, 20);
        const destLink = RNFS.TemporaryDirectoryPath + rdName + '.jpg';
        console.log('images picker dest', el, '====> ', destLink);
        if (await RNFS.exists(destLink)) {
          await RNFS.unlink(destLink);
        }
        //
        try {
          await RNFS.copyAssetsFileIOS(el, destLink, 0, 0);

          console.log('file to compy', copy);
        } catch (e) {
          console.log('eee', e);
        }
        console.log('');
        return destLink;
      }),
    );
  }
  images.forEach(async (image) => {
    console.log('imageimage', image, await RNFS.exists(image));
  });
  console.log('useFaceDetec', useFaceDetection);
  if (useFaceDetection) {
    const faceDetectionResults = await Promise.all(
      images.map((image) => hasFaceInImage(image)),
    );
    console.log(faceDetectionResults);
    const allHasFaces = faceDetectionResults.every((hasFace) => !!hasFace);
    console.log(allHasFaces);
    if (!allHasFaces) {
      setTimeout(() => {
        global.showConfirmModal({
          title: global.t('face_not_presented_in_image'),
          type: 'error',
          btnOkText: 'OK',
          onOkCallback: (navigation) => {
            DeviceEventEmitter.emit('event.dismissModal', { text: 'success' });
            navigation.goBack();
          },
          buttonVisible: true,
        });
      }, 1500);
      return;
    }
  }

  return images;
};
