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
  },
  mainWrap: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 30,
    elevation: 2,
    borderRadius: 15,
    maxWidth: width - 32,
    minWidth: 300,
    boxShadow: '1px 1px 4px #9E9E9E',
  },
  textTitle: {
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 18,
    // fontWeight: 'bold',
  },
  btnCancel: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D87B76',
    borderRadius: 100,
    width: 130,
    height: 48,
    minWidth: 130,
  },
  btnAccept: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#D87B76',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    minWidth: 130,
    width: 130,
    height: 48,
  },
});
