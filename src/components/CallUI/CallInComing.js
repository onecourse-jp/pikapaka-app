import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
let { width } = Dimensions.get('window');
width = width > 600 ? 600 : width;
export default function CallInComing({
  remoteMessage,
  cancelToast,
  acceptToast,
}) {
  return (
    <View style={styles.containView}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        {remoteMessage.data.name || remoteMessage.data.email}
      </Text>
      <Text style={{ fontSize: 12, marginBottom: 18 }}>
        {global.t('incomming_call')}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={cancelToast}
          style={[styles.btnAnswer, { backgroundColor: 'red' }]}>
          <Text style={styles.textAnswer}>{global.t('reject')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            acceptToast();
          }}
          style={[styles.btnAnswer, { backgroundColor: 'green' }]}>
          <Text style={styles.textAnswer}>{global.t('accept')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containView: {
    padding: 16,
    backgroundColor: '#fff',
    width: width - 32,
    borderRadius: 15,
    elevation: 2,
  },
  btnAnswer: {
    backgroundColor: 'red',
    width: (width - 80) / 2,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 10,
  },
  textAnswer: { textAlign: 'center', color: '#fff', fontSize: 14 },
});
