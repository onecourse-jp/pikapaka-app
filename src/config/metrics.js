/*
 * platform/application wide metrics for proper styling
 */
import { Dimensions, Platform } from 'react-native';
let { width, height } = Dimensions.get('window');
width = width > 600 ? 600 : width;

const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? 54 : 66,
};

export default metrics;
