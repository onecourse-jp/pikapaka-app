import * as React from "react";
import Svg, {G, Path} from "react-native-svg";

export default function VectorUp(props) {
  return (
    <Svg width="10" height="7" viewBox="0 0 10 7" fill={props.color} xmlns="http://www.w3.org/2000/svg">
      <Path d="M9 6L5 2L1 6" stroke="white" stroke-width="2" fill={props.color} />
      <Path d="M9 6L5 2L1 6" stroke="#196FB9" stroke-width="2" fill={props.color} />
    </Svg>
  );
}
