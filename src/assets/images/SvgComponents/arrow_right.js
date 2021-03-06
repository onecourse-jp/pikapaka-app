import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

export default function Arrow_right(props) {
  return (
    <Svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M8.56124 6.99788L2.10003 0.5L0.98002 1.62591L6.32491 7.00053L0.979492 12.3741L2.0995 13.5L8.56282 7.00372L8.56018 7.00053L8.56124 6.99788Z" fill={props.color}/>
    </Svg>
    
  );
}