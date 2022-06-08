import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Colors from '@config/styles';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
let { width, height } = Dimensions.get('window');
width = width > 600 ? 600 : width;

export default function ModalViewImage(props) {
  const { showImageModal, img, setShowModal } = props;
  return (
    <Modal
      isVisible={showImageModal}
      style={{
        margin: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: height,
        alignSelf: 'center',
      }}
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={500}
      onBackdropPress={setShowModal}
      backdropTransitionOutTiming={500}>
      <SafeAreaView style={{ position: 'relative', flexDirection: 'column' }}>
        <TouchableOpacity onPress={setShowModal}>
          <Image
            source={require('@assets/images/icons/close.png')}
            style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity>
        <FastImage
          source={{ uri: img }}
          style={{
            width: width - 32,
            height: height * 0.8,
            maxWidth: 500,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({});
