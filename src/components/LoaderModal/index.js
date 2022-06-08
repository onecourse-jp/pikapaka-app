/* global require */
import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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
import * as Progress from 'react-native-progress';
/*
   USAGE:
global.executeWithLoader(
  (setProgress, finish) => {
    let a = 0;
    const interval = setInterval(() => {
      a = a + 1;
      // setProgress(a / 10);
      if (a == 10) {
        clearInterval(interval);
        finish();
      }
    }, 300);
  },
  {
    color: Colors.color.COLOR_NEW_YORK_PINK,
    size: 60,
    title: 'title',
    showCancelButton: false,
  },
);
*/
export default function CustomModal({ navigation, route }) {
  const { t } = useContext(LocalizationContext);
  const [progress, setProgress] = useState();
  const {
    color = Colors.color.COLOR_NEW_YORK_PINK,
    size = 60,
    title = undefined,
    startAction,
    showCancelButton = false,
  } = route.params;
  const finish = () => {
    navigation.goBack();
  };
  useEffect(() => {
    startAction(setProgress, finish);
  }, []);
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
        onPress={() => {}}
      />
      <View style={styles.container}>
        {/* <View
          style={[
            styles.modalBackground,
            { backgroundColor: `rgba(0,0,0,${opacity})` },
          ]}> */}
        <View
          style={{
            ...styles.activityIndicatorWrapper,
            // ...(onCancel ? { padding: 16 } : { height: 100, width: 100 }),
          }}>
          {/* <ActivityIndicator animating={loading} color={color} size={size} /> */}
          <Progress.Circle
            progress={progress}
            animated={true}
            color={color}
            indeterminate={progress == undefined}
            size={size}
            showsText={true}
          />
          {title && (
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          )}
          {showCancelButton && (
            <TouchableOpacity
              style={{
                paddingVertical: 8,
              }}
              onPress={finish()}>
              <Text
                style={{ fontWeight: 'bold', color: '#5BB7AD' }}
                numberOfLines={1}>
                {global.t('cancel')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {/* </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    backgroundColor: 'white',

    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    // position: 'absolute',
    paddingTop: 10,
  },
  container: {
    // height: 250,
    // width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 32,
    padding: 32,
    backgroundColor: Colors.color.COLOR_WHITE,
    borderRadius: 10,
    // justifyContent: 'space-between',
  },
  imageWarn: {
    margin: 32,
    alignSelf: 'center',
  },
  topTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.color.COLOR_BLACK,
    marginTop: 30,
  },
});
