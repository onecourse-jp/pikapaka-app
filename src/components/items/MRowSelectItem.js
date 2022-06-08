import React, { useState, useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  Dimensions,
  //   ScrollView,
  Platform,
} from 'react-native';
import { Text } from 'react-native-paper';
import Modal from 'react-native-modal';
import { MButton } from '@components/items/MButton';
import SelectMultiple from 'react-native-select-multiple';
import onl from '@assets/images/onl.png';
import off from '@assets/images/off.png';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { styles } from './styles/MRowItemStyles/MRowItemStyles';
import { ItemRange } from './MRowItemComponent/ItemRange';
import { ItemInputDate } from './MRowItemComponent/ItemInputDate';
import moment from 'moment';
import ScrollView from 'rn-faded-scrollview';

let { width, height } = Dimensions.get('window');
width = width > 600 ? 600 : width;

export function MRowSelectItemItem(props) {
  const defaultNullData = {
    label: global.t('lable_no_care'),
    value: 0,
  };
  const itemInputDateRef = useRef(null);
  const usersData = useSelector((state) => state?.users?.userDetails);
  const {
    title = 'Option name',
    modalConfig = {
      modalTitle: title,
      modalData: [],
      modalType: 'checkbox', // checkbox, radio
      modalBtnOk: () => {},
    },
    attributeKey = null,
    defaultValue = null,
    resetAllValue = false,
    onChange,
    ...rest
  } = props;
  // const ref = React.createRef();
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [valueRowItem, setValueRowItem] = useState(null);
  const [listCheckbox, setListCheckbox] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(defaultNullData);
  const [selectedRight, setSelectedRight] = useState(defaultNullData);
  const [disableButtonInput, setDisableButtonInput] = useState(false);
  const [dataRender, setDataRender] = useState(modalConfig.modalData);
  const [timeMinAccepted, setTimeMinAccepted] = useState(null);
  const [timeMaxAccepted, setTimeMaxAccepted] = useState(null);
  const dataFamily = useSelector(
    (state) =>
      state.masterDataReducer.mapData['familyComposition'].selectionKeys,
  );
  // useEffect(() => {
  //   console.log('valueRowItem', valueRowItem);
  // }, [valueRowItem]);
  useEffect(async () => {
    if (defaultValue != null) {
      // console.log('defaultValuedefaultValue', defaultValue, attributeKey);

      if (attributeKey == 'profile.age' || attributeKey == 'profile.height') {
        console.log(
          'defaultValue.value.min',
          defaultValue.value.min == null ? true : false,
          defaultValue.value.max,
        );
        const labelName = (value) => {
          return value != null
            ? value +
                (attributeKey == 'profile.height' ? 'cm' : global.t('tail_age'))
            : global.t('lable_no_care');
        };
        console.log('labelName', labelName());
        setSelectedLeft({
          label: labelName(defaultValue.value.min),
          value: defaultValue.value.min || null,
        });
        setSelectedRight({
          label: labelName(defaultValue.value.max),
          value: defaultValue.value.max || null,
        });
        setValueRowItem(
          `${labelName(defaultValue.value.min)} ~ ${labelName(
            defaultValue.value.max,
          )}`,
        );
      } else if (attributeKey == 'profile.livingArea') {
        setValueRowItem(defaultValue.label);
        if (Array.isArray(defaultValue.value)) {
          setListCheckbox(defaultValue.value);
        } else {
          setListCheckbox([defaultValue]);
        }
      } else if (attributeKey == 'lastActive') {
        setValueRowItem(defaultValue.label);
        if (Array.isArray(defaultValue.value)) {
          setListCheckbox(defaultValue.value);
        } else {
          setListCheckbox([defaultValue]);
        }
      } else if (attributeKey == 'profile.annualIncome') {
        setValueRowItem([defaultValue.label[0]]);
        setListCheckbox([defaultValue.value[0]]);
      } else if (
        attributeKey == 'profile.entryDate' ||
        attributeKey == 'profile.periodOfStay'
      ) {
        let defaultTimeMin =
          defaultValue.min != 0
            ? Number(moment(defaultValue.min).format('YYYYMMDD'))
            : null;
        let defaultTimeMax =
          defaultValue.max != 0
            ? Number(moment(defaultValue.max).format('YYYYMMDD'))
            : null;
        let rowItemMin =
          defaultValue.min != 0
            ? moment(defaultValue.min).format('YYYY-MM-DD')
            : global.t('lable_no_care');
        let rowItemMax =
          defaultValue.max != 0
            ? moment(defaultValue.max).format('YYYY-MM-DD')
            : global.t('lable_no_care');
        console.log('defaultTimeMin', defaultTimeMin, defaultTimeMax);
        setValueRowItem(rowItemMin + ' ~ ' + rowItemMax);
        setTimeMinAccepted(defaultTimeMin);
        setTimeMaxAccepted(defaultTimeMax);
      } else {
        setValueRowItem(defaultValue.label);
        setListCheckbox(defaultValue.value);
      }
    }
    if (attributeKey == 'profile.familyComposition') {
      checkFamilyRender(dataFamily);
    } else if (attributeKey == 'profile.annualIncome') {
      checkAnnualIncomeRender(modalConfig.modalData);
    }
  }, []);
  const onMultipleSelection = (selections, item) => {
    if (item.value === 0) {
      if (listCheckbox.length === 1) {
        setListCheckbox([]);
      } else setListCheckbox([item]);
    } else {
      if (attributeKey == 'profile.japaneseLevel') {
        let resultLevel = [];
        if (item.value != listCheckbox[listCheckbox.length - 1]?.value) {
          for (let i = 0; i < modalConfig.modalData.length; i++) {
            if (item.value >= modalConfig.modalData[i].value) {
              resultLevel.push(modalConfig.modalData[i]);
            }
          }
          if (item.value == dataRender[dataRender.length - 1].value) {
            resultLevel = [item];
          }
        }
        setListCheckbox(resultLevel);
      } else {
        const index = selections.filter((obj) => {
          return obj.value === 0;
        });
        if (index.length == 0) {
          selections.sort(function (a, b) {
            if (a?.value && b?.value) {
              return a.value - b.value;
            }
          });
          setListCheckbox(selections);
        } else {
          setListCheckbox([item]);
        }
      }

      // const newSel = selections.splice(index, 1);
      // setListCheckbox(newSel);
    }
  };
  const onSingleSelection = (selections, item) => {
    if (listCheckbox.length > 0) {
      listCheckbox[0].value == item.value
        ? setListCheckbox([])
        : setListCheckbox([item]);
    } else {
      setListCheckbox([item]);
    }
  };

  useEffect(() => {
    if (resetAllValue) {
      setListCheckbox([]);
      setValueRowItem(null);
    }
  }, [resetAllValue]);
  const getValueForm = () => {
    console.log('listCheckbox', listCheckbox);
    let newLabel = [];
    let newValue = [];

    if (listCheckbox.length > 0) {
      for (let i = 0; i < listCheckbox.length; i++) {
        newLabel.push(listCheckbox[i].label);
        newValue.push(listCheckbox[i].value);
        setValueRowItem(newLabel);
      }
    } else {
      setValueRowItem(defaultNullData.label);
      newValue = 0;
    }
    if (attributeKey == 'lastActive') {
      newValue = newValue.length > 0 ? newValue[0] : 'none';
      console.log('newValuenewValuenewValue', newValue);
    } else if (attributeKey == 'profile.annualIncome') {
      let resultLevel = [];
      if (listCheckbox.length > 0) {
        if (listCheckbox[0].value != dataRender[dataRender.length - 1]?.value) {
          for (let i = 0; i < dataRender.length; i++) {
            if (listCheckbox[0].value <= dataRender[i].value) {
              resultLevel.push(dataRender[i]);
              newValue.push(dataRender[i].value);
            }
          }
          if (
            listCheckbox[0].value == dataRender[dataRender.length - 1].value
          ) {
            resultLevel = [listCheckbox[0]];
          }
        }
      } else {
        newValue = null;
      }
    }
    props.onChange(newValue);
    setIsShowPopup(!isShowPopup);
  };

  const getValueFormRange = () => {
    if (selectedLeft != null || selectedRight != null) {
      if (selectedLeft.value == 0 && selectedRight.value == 0) {
        // console.log('haha');
        setValueRowItem(global.t('lable_no_care'));
        props.onChange(null);
        return setIsShowPopup(!isShowPopup);
      } else {
        setValueRowItem(`${selectedLeft.label}~${selectedRight.label}`);
      }
      props.onChange({
        min: selectedLeft.value,
        max: selectedRight.value == 0 ? null : selectedRight.value,
      });
    } else {
      props.onChange(null);
    }
    console.log(selectedLeft.label, selectedRight.label);
    setIsShowPopup(!isShowPopup);
  };

  const press = () => {
    setIsShowPopup(!isShowPopup);
  };

  const checkFamilyRender = async (dataFamily) => {
    let appLanguage = await AsyncStorage.getItem('@language');
    let checkLanguage = appLanguage == 'ja' ? true : false;
    let newArray = [];
    let checkGender = usersData.profile.gender == 182 ? false : true;

    const pushArray = (item) => {
      newArray.push({
        label: checkLanguage ? item.selectionTextJp : item.selectionTextVn,
        value: item.id,
      });
    };
    if (dataFamily.length > 0) {
      dataFamily.map((item) => {
        if (
          checkGender &&
          (item.forGender == 'male' || item.forGender == 'any')
        ) {
          pushArray(item);
        } else if (
          !checkGender &&
          (item.forGender == 'female' || item.forGender == 'any')
        ) {
          pushArray(item);
        }
      });
    }
    setDataRender(newArray);
  };
  const checkAnnualIncomeRender = async (dataIncome) => {
    const appLanguage = await AsyncStorage.getItem('@language');
    const checkLanguage = appLanguage == 'ja' ? true : false;
    let newArray = dataIncome;
    for (let i = 1; i < dataIncome.length - 1; i++) {
      let textchange = dataIncome[i].label;
      // console.log('textchange', dataIncome[i]);
      if (checkLanguage) {
        if (textchange.includes('万円以上')) {
          textchange = textchange.split('万円以上')[0] + '万以上';
        }
      } else {
        if (textchange.includes('~')) {
          textchange = textchange.split('~')[0] + 'trở lên';
        }
      }
      newArray[i] = { label: textchange, value: dataIncome[i].value };
    }
    setDataRender(newArray);
  };

  const renderLabel = (label) => {
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
          },
          styles.rowWeb,
        ]}>
        <Text
          style={{
            marginLeft: 10,
            paddingRight: 30,
            marginTop: Platform.OS === 'android' ? -5 : 0,
            textAlign: 'justify',
          }}>
          {label}
        </Text>
      </View>
    );
  };

  return (
    <>
      <TouchableOpacity style={[styles.item]} {...rest} onPress={press}>
        <Text numberOfLines={1} style={[styles.titleText]}>
          {title}
        </Text>

        {Array.isArray(valueRowItem) ? (
          <View>
            {valueRowItem.map((item, index) => {
              return (
                <Text
                  numberOfLines={5}
                  style={[styles.textValue, { textAlign: 'right' }]}
                  key={index}>
                  {item}
                </Text>
              );
            })}
          </View>
        ) : (
          <View>
            <Text
              numberOfLines={5}
              style={[styles.textValue, { textAlign: 'right' }]}>
              {valueRowItem}
            </Text>
          </View>
        )}

        {!valueRowItem && (
          <Text numberOfLines={2} style={[styles.textDefault]}>
            {global.t('text_selector')}
          </Text>
        )}
      </TouchableOpacity>

      <Modal
        isVisible={isShowPopup}
        style={{
          margin: 20,
          maxWidth: 600,
          width: width - 40,
          alignSelf: 'center',
        }}
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}>
        <View
          style={[
            styles.modalContent,
            {
              height:
                modalConfig.modalType == 'inputDate'
                  ? 0.55 * height
                  : 0.7 * height,
            },
          ]}>
          <View style={[styles.dFlex, styles.modalTitle]}>
            <Text
              style={[styles.modalTitleTxt]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {modalConfig.modalTitle || title}
            </Text>

            {modalConfig.modalType == 'checkbox' && (
              <ScrollView
                persistentScrollbar={true}
                fadeSize={80}
                allowEndFade={Platform.OS === 'ios' ? true : false}
                indicatorStyle={'black'}
                fadeColors={[
                  'rgba(240, 240, 240, 0.1)',
                  'rgba(240, 240, 240, 0.2)',
                  'rgba(239, 239, 239, 0.2)',
                  'rgba(229, 229, 229, 0.3)',
                  'rgba(229, 229, 229, 0.6)',
                ]}
                contentContainerStyle={{ padding: 20 }}
                // containerStyle={{ paddingRight: 14 }}
                style={[styles.scrollview, { paddingBottom: 100 }]}>
                <SelectMultiple
                  items={dataRender}
                  selectedItems={listCheckbox}
                  renderLabel={renderLabel}
                  onSelectionsChange={
                    attributeKey == 'profile.annualIncome' ||
                    attributeKey == 'lastActive'
                      ? onSingleSelection
                      : onMultipleSelection
                  }
                  keyExtractor={(index) => {
                    index.toString();
                  }}
                  rowStyle={styles.rowCheckbox}
                  labelStyle={styles.labelRow}
                  checkboxStyle={styles.checkbox}
                  selectedCheckboxSource={onl}
                  checkboxSource={off}
                  selectedRowStyle={styles.selectedRow}
                />
              </ScrollView>
            )}
            {modalConfig.modalType == 'range' && (
              <ItemRange
                modalConfig={modalConfig.modalData}
                selectedRight={selectedRight}
                selectedLeft={selectedLeft}
                setSelectedRight={(data) => setSelectedRight(data)}
                setSelectedLeft={(data) => setSelectedLeft(data)}
              />
            )}
            {modalConfig.modalType == 'inputDate' && (
              <ItemInputDate
                ref={itemInputDateRef}
                onChange={onChange}
                timeMinAccepted={timeMinAccepted}
                timeMaxAccepted={timeMaxAccepted}
                isShowPopup={isShowPopup}
                setIsShowPopup={(item) => {
                  setIsShowPopup(item);
                }}
                setValueRowItem={(item) => {
                  setValueRowItem(item);
                }}
                setDisableButtonInput={(item) => {
                  setDisableButtonInput(item);
                }}
                setTimeMinAccepted={(item) => {
                  setTimeMinAccepted(item);
                }}
                setTimeMaxAccepted={(item) => {
                  setTimeMaxAccepted(item);
                }}
                attributeKey={attributeKey}
              />
            )}
          </View>

          <View style={[styles.row, styles.rowSpaceBetween, styles.btnGroup]}>
            <MButton
              title={global.t('cancel_search')}
              preset="outline"
              width={(width - 16 * 3 - 19 * 2) / 2}
              onPress={() => press()}
            />
            {modalConfig.modalType == 'inputDate' ? (
              <MButton
                title={global.t('agree_search')}
                preset="primary"
                width={(width - 16 * 3 - 19 * 2) / 2}
                onPress={() => itemInputDateRef.current.getValueFormInputDate()}
                disableButton={disableButtonInput}
              />
            ) : (
              <MButton
                title={global.t('agree_search')}
                preset="primary"
                width={(width - 16 * 3 - 19 * 2) / 2}
                onPress={
                  modalConfig.modalType == 'checkbox'
                    ? getValueForm
                    : getValueFormRange
                }
              />
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}
