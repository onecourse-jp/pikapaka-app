import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { styles } from './styles';
export default function ConfirmModal(props) {
  const {
    accept = () => {},
    cancel = () => {},
    title,
    onlyAccept = false,
    underlayColor = 'rgba(0, 0, 0, 0.5)',
    backgroundModalColor = '#fff',
    modalType,
    titleCenter = true,
    containerStyle,
  } = props;
  let imgType = '';

  return (
    <View
      //   onPress={() => cancel()}
      style={[styles.container, { backgroundColor: underlayColor }]}>
      <View
        style={[
          styles.mainWrap,
          { backgroundColor: backgroundModalColor },
          containerStyle,
        ]}>
        {imgType !== '' ? (
          <Image
            source={imgType}
            style={[
              styles.imageWarn,
              {
                width: 60,
                height: 60,
                alignSelf: 'center',
                marginBottom: Platform.OS === 'web' ? 30 : 0,
              },
            ]}
          />
        ) : (
          <View style={{ padding: 8 }}></View>
        )}
        <Text
          style={[
            styles.textTitle,
            { textAlign: titleCenter ? 'center' : 'left' },
          ]}>
          {title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: !onlyAccept ? 'space-between' : 'center',
          }}>
          {!onlyAccept && (
            <TouchableOpacity onPress={() => cancel()} style={styles.btnCancel}>
              <Text style={{ color: '#D87B76', textAlign: 'center' }}>
                {global.t('cancel')}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => accept()}
            style={[styles.btnAccept, { marginLeft: !onlyAccept ? 10 : 0 }]}>
            <Text style={{ color: '#fff', textAlign: 'center' }}>
              {global.t('text_action')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
