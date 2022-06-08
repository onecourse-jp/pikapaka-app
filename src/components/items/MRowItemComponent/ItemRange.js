import React from 'react';
import { View, Text } from 'react-native';
import ScrollPicker from '../ScrollPicker';
import { styles } from '../styles/MRowItemStyles/MRowItemStyles';
export function ItemRange(props) {
  const {
    modalConfig,
    selectedRight,
    selectedLeft,
    setSelectedRight,
    setSelectedLeft,
  } = props;
  // console.log('modalConfig', modalConfig);
  return (
    <View style={{ marginBottom: 16 }}>
      <View style={styles.containerScroll}>
        <View style={styles.wrapperVertical}>
          <Text style={styles.rangeTitle}>{global.t('from')}</Text>
          <ScrollPicker
            style={styles.scrollPicker}
            dataSource={modalConfig}
            selectedIndex={
              selectedLeft.value > 0
                ? selectedLeft.value - modalConfig[1]?.value + 1
                : 0
            }
            renderItem={(data, index) => {
              return (
                <View key={index}>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 24,
                    }}>
                    {data.label}
                  </Text>
                </View>
              );
            }}
            onValueChange={(data) => {
              console.log('-----------------selected Left', data);
              setSelectedLeft(data);
              if (
                data.value > selectedRight.value &&
                data.value != 0 &&
                selectedRight.value != null
              ) {
                console.log('-----------------selected Right', data);
                setSelectedRight(data);
              }
            }}
            // wrapperHeight={180}
            wrapperWidth={120}
            wrapperColor="#ffffff"
            itemHeight={60}
            highlightColor="rgba(60, 60, 67, 0.36)"
            // highlightBorderWidth={2}
          />
        </View>
        <View style={styles.wrapperVertical}>
          <Text style={styles.rangeTitle}>{global.t('to')}</Text>
          <ScrollPicker
            style={styles.scrollPicker}
            dataSource={modalConfig}
            selectedIndex={
              selectedRight.value > 0
                ? selectedRight.value - modalConfig[1].value + 1
                : 0
            }
            renderItem={(data, index) => {
              return (
                <View key={index}>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 24,
                    }}>
                    {data.label}
                  </Text>
                </View>
              );
            }}
            onValueChange={(data) => {
              console.log('-----------------selected Right', data);
              setSelectedRight(data);
              if (
                data.value < selectedLeft.value &&
                data.value != 0 &&
                data.value != null &&
                selectedLeft.value != null
              ) {
                console.log('-----------------selected Left', data);
                setSelectedLeft(data);
              }
            }}
            // wrapperHeight={180}
            wrapperWidth={120}
            wrapperColor="#ffffff"
            itemHeight={60}
            highlightColor="rgba(60, 60, 67, 0.36)"
            // highlightWidth ={2}
          />
        </View>
      </View>
    </View>
  );
}
