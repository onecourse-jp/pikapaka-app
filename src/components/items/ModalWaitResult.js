import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
let { width } = Dimensions.get('window');
width = width > 600 ? 600 : width;

export default function ModalWaitResult(props) {
  const {
    statusModal,
    statusUpdateSuccess,
    loadingUpdate = true,
    setIsShowPopup,
  } = props;
  return (
    <Modal
      isVisible={statusModal}
      style={{
        margin: 20,
        maxWidth: 600,
        width: width - 40,
        alignSelf: 'center',
      }}
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={500}
      backdropTransitionOutTiming={500}>
      {loadingUpdate && <ActivityIndicator size="large" color="#D87B76" />}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalPopup: { justifyContent: 'flex-end', flex: 1, margin: 0 },
  viewPopup: {
    backgroundColor: 'white',
    paddingBottom: 54,
    padding: 16,
  },
  textPopup: {
    fontSize: 14,
    paddingHorizontal: 10,
  },
  viewModalStatus: {
    flexDirection: 'row',
    backgroundColor: 'white',
    position: 'absolute',
    width: 60,
    height: 60,
    // left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 26,
    borderRadius: 15,
  },
  viewOverWrite: {
    borderRadius: 10,
    position: 'absolute',
    // flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#272D2D',
    opacity: 0.6,
    zIndex: 55,
  },
  textOverWrite: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewIsBtn: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#D87B76',
  },
  moreBtn: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'red',
  },
  textAlert: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  viewWrapItemAlert: {
    paddingBottom: 50,
    flexDirection: 'column',
    alignItems: 'center',
  },
  textUnderStand: {
    color: '#D87B76',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});
