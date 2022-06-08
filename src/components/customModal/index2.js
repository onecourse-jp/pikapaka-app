/* global require */
import React, { useContext } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import LocalizationContext from '@context/LocalizationContext';
import Colors from '@config/styles';
import { styles } from './styles';
/*
  USAGE: 
  global.showConfirmModal({
                topTitle: 'bbbbb',
                title: 'aaaa',
                btnOkText: 'OK',
                horizontalButtons: false,
                btnCancelText: 'Cancel',
                type: 'error' | 'success',
                onOkCallback: () => {},
                onCancelCallback: () => {},
                timeout: 1000,
                buttonVisible: true,
              });
*/
export default function CustomModal({ navigation, route }) {
  const { colors } = useTheme();
  const { t } = useContext(LocalizationContext);
  const {
    topTitle = null,
    title,
    type = '',
    onOkCallback = null,
    btnOkText = null,
    horizontalButtons = true,
    onCancelCallback = null,
    btnCancelText = null,
    buttonVisible = true,
    timeout = 1000,
  } = route.params;

  let imgType = '';


  if (!buttonVisible) {
    setTimeout(() => {
      navigation.goBack();

      if (onOkCallback) {
        onOkCallback();
      } else {
      }
    }, timeout);
  }

  return (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Pressable
        style={{
          ...StyleSheet.absoluteFill,
          ...{ backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        }}
        onPress={() => {
          navigation.goBack();
          if (onCancelCallback) {
            onCancelCallback(navigation);
          } else if (onOkCallback) {
            onOkCallback(navigation);
          }
        }}
      />
      <View style={styles.container}>
        {topTitle && <Text style={styles.topTitle}>{topTitle}</Text>}
        {imgType !== '' ? (
          <Image source={imgType} style={styles.imageWarn} />
        ) : (
          <View style={{ padding: 8 }}></View>
        )}
        <Text style={styles.title}>{title}</Text>
        <View
          style={{
            ...styles.btnBox,
            ...(horizontalButtons
              ? { flexDirection: 'row' }
              : { flexDirection: 'column-reverse' }),
          }}>
          {onCancelCallback && (
            <TouchableOpacity
              style={{
                ...styles.touchable,
                ...styles.invertTouchable,
                ...(horizontalButtons ? { flex: 1 } : {}),
              }}
              onPress={() => onCancelCallback(navigation)}>
              <Text
                style={{
                  ...styles.text,
                  ...{ color: Colors.color.COLOR_NEW_YORK_PINK },
                }}>
                {btnCancelText}
              </Text>
            </TouchableOpacity>
          )}
          {onOkCallback && buttonVisible && (
            <TouchableOpacity
              style={{
                ...styles.touchable,
                ...(horizontalButtons ? { flex: 1 } : {}),
              }}
              onPress={() => {
                navigation.goBack();
                if (onOkCallback) onOkCallback(navigation);
              }}>
              <Text style={styles.text}>{btnOkText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
