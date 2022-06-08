import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const Q = 200; // buttons container height (Not Using for now)
export const H = SCREEN_HEIGHT - Q; //  (Not using for now)
export const W = SCREEN_WIDTH;
export const MINIMUM_CROP_AREA = 100   // Add to make minimum crop area
