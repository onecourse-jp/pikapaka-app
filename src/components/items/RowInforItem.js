import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function RowInforItem({ item }) {
  return (
    <View style={styles.ViewItemInfor}>
      <Text style={styles.textInfor}>{item?.key}</Text>
      {Array.isArray(item?.label) ? (
        <View>
          {item?.label.map((el, index) => {
            return (
              <Text
                key={index}
                style={[styles.textInforValue, { textAlign: 'right' }]}>
                {el}
              </Text>
            );
          })}
        </View>
      ) : (
        <Text style={[styles.textInforValue]}>{item?.label}</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  ViewItemInfor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
    paddingTop: 8,
    paddingLeft: 16,
    paddingBottom: 8,
    paddingRight: 16,
    marginBottom: 16,
    borderRadius: 10,
  },
  textInfor: {
    maxWidth: '50%',
    minWidth: '20%',
    fontSize: 14,
    lineHeight: 24,
  },
  textInforValue: {
    flex: 1,
    paddingLeft: 20,
    // maxWidth: '50%',

    fontSize: 14,
    lineHeight: 24,
    maxWidth: 207,
    textAlign: 'right',
  },
});
