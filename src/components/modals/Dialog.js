import React, { useContext } from 'react';
import {
  Animated,
  View,
  Text,
  Pressable,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import LocalizationContext from '@context/LocalizationContext';
import Colors from '@config/styles';
import ButtonTheme from '../buttons/ButtonTheme';

export default function ModalScreen({ navigation, route }) {
  const { colors } = useTheme();
  const { t } = useContext(LocalizationContext);
  //const { current } = useCardAnimation();
  // const {title, buttonText, type, callback, buttonVisible, timeout } = route.params;
  const title = route.params.titleError;
  const titleAction = route.params.titleAction;
  console.log('route:', route.params.titleError);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        ]}
        onPress={navigation.goBack}
      />
      <View style={styles.container}>
        <Image
          // source={require('@assets/images/warn.png')}
          style={styles.imageWarn}
        />
        <Text style={styles.title}>{title}</Text>
        {/* <TouchableOpacity style={styles.touchable} onPress={navigation.goBack}> */}
        {/* <Text style={styles.text}>{titleAction}</Text> */}
        <ButtonTheme
          title={global.t('try_again', { locale: 'ja' })}
          title1={global.t('try_again', { locale: 'vi' })}
          backgroundColor="#fff"
          textColor={Colors.color.COLOR_NEW_YORK_PINK}
          HandleAction={navigation.goBack}
          colorBorder={Colors.color.COLOR_NEW_YORK_PINK}
          hasBorder={true}
          style={{ width: '100%' }}
        />
        {/* </TouchableOpacity> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '90%',
    padding: 16,
    backgroundColor: Colors.color.COLOR_WHITE,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageWarn: {
    marginTop: 64,
    width: 56,
    height: 56,
  },
  title: {
    fontSize: 16,
    color: Colors.color.COLOR_BLACK,
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    color: Colors.color.COLOR_NEW_YORK_PINK,
    textAlign: 'center',
  },
  touchable: {
    height: 48,
    width: '100%',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.color.COLOR_NEW_YORK_PINK,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
});
