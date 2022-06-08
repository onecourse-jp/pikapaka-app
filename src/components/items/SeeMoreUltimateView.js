import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LocalizationContext from '@context/LocalizationContext';

export default function SeeMoreUltimateView(props) {
  const { t } = useContext(LocalizationContext);
  const navigation = useNavigation();
  const { keySearch, paramSearch } = props;
  // console.log('paramSearchparamSearch', paramSearch);
  const onPress = () => {
    navigation.navigate('SeeMoreScreen', {
      keySearch: keySearch,
      paramSearch: paramSearch,
    });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          color: '#5BB7AD',
          fontSize: 12,
          textAlign: 'center',
          fontWeight: 'bold',
          marginTop: 5,
          paddingBottom: 20,
        }}>
        {t('text_see_more')}
      </Text>
    </TouchableOpacity>
  );
}
