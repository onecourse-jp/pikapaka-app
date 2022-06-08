import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { View, Text, Dimensions } from 'react-native';
import ScrollPicker from '../ScrollPicker';
import { styles } from '../styles/MRowItemStyles/MRowItemStyles';
let { width, height } = Dimensions.get('window');
width = width > 600 ? 600 : width;
export function ItemRange(props) {
  const {
    modalConfig,
    selectedRight,
    selectedLeft,
    setSelectedRight,
    setSelectedLeft,
    
  } = props;
  const [options] = useState(modalConfig.modalData || modalConfig);
  console.log('options', new Date(), options);
  console.log('options');
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      textAlign: 'center',
    }),
    control: (provided, state) => ({
      ...provided,
      textAlign: 'center',
    }),
    menu: (provided, state) => ({
      ...provided,
      textAlign: 'center',

      minWidth: 150,
    }),
    container: (provided, state) => ({
      ...provided,
      minWidth: 150,
    }),
  };
  return (
    <View
      style={{
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <View style={[styles.containerScroll, { maxWidth: 600 }]}>
        <View style={styles.wrapperVertical}>
          <Text style={styles.rangeTitle}>{global.t('from')}</Text>
          <Select
            styles={customStyles}
            options={options}
            defaultValue={selectedLeft}
            menuShouldScrollIntoView={true}
            onChange={(item) => setSelectedLeft(item)}
            maxMenuHeight={height * 0.3}
            minMenuWidth={150}
            closeMenuOnSelect={false}
            menuIsOpen={true}
            closeMenuOnScroll={false}
          />
        </View>
        <View style={styles.wrapperVertical}>
          <Text style={styles.rangeTitle}>{global.t('to')}</Text>
          <Select
            styles={customStyles}
            options={options}
            defaultValue={selectedRight}
            menuShouldScrollIntoView={true}
            onChange={(item) => setSelectedRight(item)}
            maxMenuHeight={height * 0.3}
            closeMenuOnSelect={false}
            menuIsOpen={true}
            closeMenuOnScroll={false}
          />
        </View>
      </View>
    </View>
  );
}
