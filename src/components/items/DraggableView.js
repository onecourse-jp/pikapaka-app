import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
let { width, height } = Dimensions.get('window');
width = width > 600 ? 600 : width;
const DraggableView = ({ changeUser }) => {
  const [onChange, setOnChange] = useState(true);
  useEffect(() => {
    setOnChange(changeUser);
    
  }, changeUser);
  const pan = useRef(new Animated.ValueXY()).current;
  // const fadeAnim = useRef(new Animated.Value(0)).current;
  const moveFunction = () => {
    Animated.spring(
      pan, // Auto-multiplexed
      {
        toValue: { x: -width, y: 0 },
        // friction: 1,
        tension: 1,
        useNativeDriver: false,
      }, // Back to zero
    ).start();
    setTimeout(() => {
      Animated.spring(
        pan, // Auto-multiplexed
        {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }, // Back to zero
      ).start();
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        // {...panResponder.panHandlers}
        style={[pan.getLayout(), styles.box]}
      />
      <TouchableOpacity onPress={moveFunction}>
        <Text>adasdas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#fff',
    flex: 1,
    // position: 'relative',
    width: width,
    marginLeft: width * 2,
  },
});

export default DraggableView;
