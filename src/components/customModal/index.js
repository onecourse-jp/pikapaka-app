/* global require */
import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
  TextInput,
  ScrollView,
  Spinner,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import LocalizationContext from '@context/LocalizationContext';
import Colors from '@config/styles';
import Checkbox from '../../components/buttons/Checkbox';
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
    showToggle = false,
    toggleLabel = '',
    horizontalButtons = true,
    onCancelCallback = null,
    btnCancelText = null,
    buttonVisible = true,
    onPressOverlayGoBack = false,
    timeout = 1000,
    shouldAutoGoBack = false,
    touchOutSideToGoBack = true,
    isInputModal = false,
    partnerDetail,
    nickNameChanged,
    displayIcon = true,
    showCloseBtn = false,
    justGoBack = false,
  } = route.params;
  const [isChecked, setChecked] = useState(false);
  const [over10Character, setOver10Character] = useState(false);
  const [isDisableOkBtn, setIsDisableOkBtn] = useState(false);
  const [nickname, setNickname] = useState(
    nickNameChanged !== undefined
      ? nickNameChanged
      : partnerDetail?.profile?.nickName,
  );
  let imgType = '';

  useEffect(() => {
    if (isInputModal) {
      if (nickname?.length > 10) {
        setOver10Character(true);
        setIsDisableOkBtn(true);
      } else {
        setOver10Character(false);
        setIsDisableOkBtn(false);
      }
    }
  }, [nickname]);

  if (!buttonVisible) {
    setTimeout(() => {
      if (shouldAutoGoBack) {
        navigation.goBack();
      }
      if (onOkCallback) {
        onOkCallback(navigation, isChecked, nickname);
      } else {
        navigation.goBack();
      }
    }, timeout);
  }

  return (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: isInputModal ? 32 : 0,
      }}>
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        ]}
        onPress={() => {
          if (touchOutSideToGoBack) {
            if (shouldAutoGoBack) navigation.goBack();
            if (!onPressOverlayGoBack)
              if (onCancelCallback) {
                onCancelCallback(navigation, isChecked, nickname);
              } else if (onOkCallback) {
                onOkCallback(navigation, isChecked, nickname);
              } else navigation.goBack();
            else navigation.goBack();
          }
        }}
      />
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
        <View style={[styles.container, { position: 'relative' }]}>
          {showCloseBtn && (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                position: 'absolute',
                zIndex: 2,
                top: 10,
                right: 10,
                backgroundColor: '#D0CFCF',
                borderRadius: 10,
                padding: 8,
              }}>
              <Image
                source={require('@assets/images/icons/close_black.png')}
                style={{ width: 12, height: 12 }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
          {imgType !== '' && displayIcon ? (
            <Image source={imgType} style={styles.imageWarn} />
          ) : (
            <View style={{ padding: 8 }}></View>
          )}
          {topTitle && <Text style={styles.topTitle}>{topTitle}</Text>}

          <Text
            style={[
              styles.title,
              { marginTop: isInputModal ? 8 : Platform.OS === 'web' ? 0 : 30 },
            ]}>
            {title}
          </Text>
          {showToggle && (
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 8,
                alignItems: 'center',
              }}>
              <Checkbox
                isChecked={isChecked}
                onChangeValue={() => setChecked(!isChecked)}
                title={toggleLabel}
              />
              {/* <Text style={{ marginLeft: 8 }}>{toggleLabel}</Text> */}
            </View>
          )}
          {isInputModal && (
            <View
              style={{
                marginTop: 16,
                marginBottom: Platform.OS === 'web' ? 16 : 0,
              }}>
              <TextInput
                style={[
                  styles.commentText,
                  Platform.select({
                    web: {
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 10,
                      paddingLeft: 10,
                    },
                    ios: {
                      paddingVertical: 16,
                    },
                    android: {
                      paddingVertical: -4,
                    },
                  }),
                ]}
                onChangeText={(e) => setNickname(e)}
                value={nickname}
                multiline={false}
                numberOfLines={3}
                underlineColor="#FFF"
                placeholder={global.t('nickname_placeholder')}
                placeholderTextColor="#696a6a"
                // textAlignVertical={'top'}
                minHeight={48}
                maxHeight={48}
              />
              {over10Character && (
                <Text style={{ color: 'red', fontSize: 12, marginTop: 6 }}>
                  {global.t('error_10_character')}
                </Text>
              )}
            </View>
          )}
          <View
            style={{
              ...styles.btnBox,
              ...(horizontalButtons
                ? {
                    flexDirection: 'row',
                    justifyContent: onCancelCallback
                      ? 'space-between'
                      : 'center',
                  }
                : { flexDirection: 'column-reverse', alignItems: 'center' }),
            }}>
            {onCancelCallback && (
              <TouchableOpacity
                style={[
                  Platform.OS === 'web' ? styles.webCancel : styles.webnone,
                  {
                    ...styles.touchable,
                    ...styles.invertTouchable,
                    ...(horizontalButtons
                      ? { ...styles.flex1 }
                      : { ...styles.non_horizontal_btn }),
                  },
                ]}
                onPress={() => {
                  if (justGoBack) {
                    navigation.goBack();
                  } else {
                    onCancelCallback(navigation, isChecked, nickname);
                  }
                }}>
                <Text
                  style={[
                    styles.text,
                    { color: Colors.color.COLOR_NEW_YORK_PINK },
                  ]}>
                  {btnCancelText}
                </Text>
              </TouchableOpacity>
            )}
            {onOkCallback && buttonVisible && (
              <TouchableOpacity
                style={[
                  Platform.OS === 'web' ? styles.web : styles.webnone,
                  {
                    ...styles.touchable,
                    ...(horizontalButtons
                      ? { ...styles.flex1 }
                      : { ...styles.non_horizontal_btn }),
                    opacity: isDisableOkBtn ? 0.6 : 1,
                  },
                ]}
                disabled={isDisableOkBtn}
                onPress={() => {
                  onOkCallback
                    ? onOkCallback(navigation, isChecked, nickname)
                    : navigation.goBack();
                  if (shouldAutoGoBack) navigation.goBack();
                }}>
                <Text style={styles.text}>{btnOkText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
