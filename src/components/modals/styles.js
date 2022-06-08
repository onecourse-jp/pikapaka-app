import { StyleSheet, Dimensions } from 'react-native';
let { width, height } = Dimensions.get('window');
width = width > 600 ? 600 : width;
export const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
  },
  mainWrap: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 30,
    elevation: 2,
    borderRadius: 15,
    maxWidth: width - 32,
  },
  textTitle: {
    textAlign: 'center',
    // marginBottom: 40,
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 32,
  },
  btnCancel: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D87B76',
    borderRadius: 100,
    minWidth: 130,
  },
  btnAccept: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#D87B76',
    borderRadius: 100,
    minWidth: 130,
  },
  imageWarn: {
    // margin: 32,
    alignSelf: 'center',
    width: 56,
    height: 56,
  },
  commentText: {
    backgroundColor: '#e8e8e8',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
