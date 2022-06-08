import { StyleSheet, Dimensions } from 'react-native';
import Colors from '@config/styles';

let { width, height } = Dimensions.get('window');
width = width > 600 ? 600 : width;

export const styles = StyleSheet.create({
  container: {
    // height: 250,
    // width: '90%',
    marginHorizontal: 32,
    padding: 16,
    backgroundColor: Colors.color.COLOR_WHITE,
    borderRadius: 10,
    // justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingTop: 16,
  },
  imageWarn: {
    alignSelf: 'center',
    width: 56,
    height: 56,
    marginTop: 30,
  },
  topTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.color.COLOR_BLACK,
    marginTop: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.color.COLOR_BLACK,
    marginTop: 30,
    // marginBottom: 20,
  },
  text: {
    fontSize: 14,
    color: Colors.color.COLOR_WHITE,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  touchable: {
    height: 48,
    // flex: 1,
    borderRadius: 100,
    backgroundColor: Colors.color.COLOR_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 8,
    minWidth: (width - 120) / 2,
  },
  invertTouchable: {
    borderWidth: 1,
    borderColor: Colors.color.COLOR_NEW_YORK_PINK,
    backgroundColor: Colors.color.COLOR_WHITE,
  },
  btnBox: {
    // flexDirection: 'row',
    // flex: 1,
    marginTop: 20,
    marginBottom: 16,
  },
  flex1: {
    flex: 1,
  },
  non_horizontal_btn: {
    minWidth: width - 120,
  },
  web: {},
  webnone: {},
  commentText: {
    backgroundColor: '#F5F6F7',
    borderRadius: 10,
    paddingHorizontal: 16,
  },
});
