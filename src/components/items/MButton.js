import * as React from 'react';
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import Colors from '@config/styles';
import NewWidget from '@assets/svg/new-widget.svg';

export function MButton(props) {
  const {
    preset = 'outline',
    onPress = () => {},
    title,
    value = null,
    disableButton = false,
    width = 100,
    ...rest
  } = props;

  React.useEffect(() => {
    console.log('---------disableButton', disableButton);
  }, []);

  return (
    <TouchableOpacity
      style={[
        preset == 'outline' ? styles.outline : styles.primary,
        { width: width, opacity: disableButton ? 0.7 : 1 },
      ]}
      {...rest}
      disabled={disableButton}
      onPress={onPress}>
      <Text
        numberOfLines={1}
        style={[
          preset == 'outline'
            ? styles.titleTextOutline
            : styles.titleTextPrimary,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primary: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.color.COLOR_NEW_YORK_PINK,
    paddingVertical: 10,
    marginVertical: 8,
    borderRadius: 100,
  },

  outline: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.color.COLOR_ALABASTER,
    paddingVertical: 10,
    marginVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.color.COLOR_NEW_YORK_PINK,
  },

  titleTextOutline: {
    color: Colors.color.COLOR_NEW_YORK_PINK,
    fontStyle: 'normal',
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 24,
  },

  titleTextPrimary: {
    color: '#fff',
    fontStyle: 'normal',
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 24,
  },
  textDefault: {
    color: '#272D2D',
    fontStyle: 'normal',
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 24,
  },
  textValue: {
    color: '#5BB7AD',
    fontStyle: 'normal',
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 24,
  },
});
