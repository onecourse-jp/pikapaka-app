import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import * as Progress from 'react-native-progress';

const Loader = ({
  loading = false,
  color,
  size = 60,
  opacity = 0.4,
  title = '',
  progress = undefined,
  onCancel = undefined,
}) => {
  return (
    <Modal
      transparent
      animationType={'none'}
      visible={loading}
      onRequestClose={() => null}>
      <View
        style={[
          styles.modalBackground,
          { backgroundColor: `rgba(0,0,0,${opacity})` },
        ]}>
        <View
          style={{
            ...styles.activityIndicatorWrapper,
            ...onCancel?{padding:16}:{ height: 100, width: 100 },
          }}>
          {/* <ActivityIndicator animating={loading} color={color} size={size} /> */}
          <Progress.Circle
            progress={progress}
            animated={loading}
            color={color}
            indeterminate={progress == undefined}
            size={size}
            showsText={true}
          />
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {onCancel && (
            <TouchableOpacity
              style={{
                marginTop: 16,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              onPress={onCancel}>
              <Text
                style={{ fontWeight: 'bold', color: '#5BB7AD' }}
                numberOfLines={1}>
                {global.t('cancel')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
  opacity: (props, propName, componentName) => {
    if (props[propName] < 0 || props[propName] > 1) {
      return new Error('Opacity prop value out of range');
    }
  },
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicatorWrapper: {
    backgroundColor: 'white',

    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    position: 'absolute',
    paddingTop: 50,
  },
});

export default Loader;
