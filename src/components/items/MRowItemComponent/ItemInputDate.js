import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { View, Text, Dimensions } from 'react-native';
import { styles } from '../styles/MRowItemStyles/MRowItemStyles';
import SelectMultiple from 'react-native-select-multiple';
import onl from '@assets/images/onl.png';
import off from '@assets/images/off.png';
import DateInput from '@components/items/DateInput';
import moment from 'moment';

let { width } = Dimensions.get('window');
width = width > 600 ? 600 : width;
export const ItemInputDate = forwardRef((props, ref) => {
  const {
    onChange,
    setIsShowPopup,
    setValueRowItem,
    isShowPopup,
    attributeKey,
    setDisableButtonInput,
    setTimeMinAccepted,
    setTimeMaxAccepted,
    timeMinAccepted = null,
    timeMaxAccepted = null,
  } = props;
  const [minInput, setMinInput] = useState(null);
  const [maxInput, setMaxInput] = useState(null);
  const [statusErrorMin, setStatusErrorMin] = useState(false);
  const [errorInputMin, setErrorInputMin] = useState('');

  const [statusErrorMax, setStatusErrorMax] = useState(false);
  const [errorInputMax, setErrorInputMax] = useState('');
  //   const [errorInput3, setErrorInput3] = useState('');
  //   const [statusError3, setStatusError3] = useState(false);
  const [statusSubmitMin, setStatusSubmitMin] = useState([]);
  const [statusSubmitMax, setStatusSubmitMax] = useState([]);
  const defaultNullData = {
    label: global.t('lable_no_care'),
    value: 0,
  };
  const formatDate = (data) => {
    data = data.toString();
    let string =
      data.slice(0, 4) + '-' + data.slice(4, 6) + '-' + data.slice(6);
    return new Date(string);
  };
  console.log(
    'timeMinAcceptedtimeMinAccepted',
    timeMinAccepted,
    timeMaxAccepted,
  );
  useEffect(() => {
    console.log(
      'statusErrorMin,statusErrorMax',
      statusErrorMin,
      statusErrorMax,
    );
    if (statusErrorMin == false && statusErrorMax == false) {
      setDisableButtonInput(false);
    } else {
      setDisableButtonInput(true);
    }
  }, [statusErrorMin, statusErrorMax]);
  useEffect(() => {
    if (attributeKey == 'profile.entryDate' || attributeKey == 'entryDate') {
      if (
        statusSubmitMin.length === 0 &&
        minInput != null &&
        minInput.getTime() > new Date().getTime()
      ) {
        getErrorInputMin(global.t('error_input_entryDate'));
      }
      if (
        statusSubmitMax.length === 0 &&
        maxInput != null &&
        maxInput.getTime() > new Date().getTime()
      ) {
        getErrorInputMax(global.t('error_input_entryDate'));
      }
    }
    if (
      attributeKey == 'profile.periodOfStay' ||
      attributeKey == 'periodOfStay'
    ) {
      if (
        statusSubmitMin.length === 0 &&
        minInput != null &&
        minInput.getTime() < new Date().getTime()
      ) {
        getErrorInputMin(global.t('error_input_periodOfStay'));
      }
      if (
        statusSubmitMax.length === 0 &&
        maxInput != null &&
        maxInput.getTime() < new Date().getTime()
      ) {
        getErrorInputMax(global.t('error_input_periodOfStay'));
      }
    }
  }, [statusSubmitMin, statusSubmitMax]);

  useEffect(() => {
    if (timeMinAccepted !== null && minInput == null) {
      // formatDate(timeMinAccepted);
      setMinInput(formatDate(timeMinAccepted));
    }
    if (timeMaxAccepted !== null && maxInput == null) {
      // formatDate(timeMaxAccepted);
      console.log('adasdsadadadsda');
      setMaxInput(formatDate(timeMaxAccepted));
    }
  }, []);
  const onSingleSelectionSubmitMin = (selections, item) => {
    if (statusSubmitMin.length > 0) {
      statusSubmitMin[0].value == item.value
        ? setStatusSubmitMin([])
        : setStatusSubmitMin([item]);
    } else {
      setStatusSubmitMin([item]);
      setStatusErrorMin(false);
    }
  };

  const onSingleSelectionSubmitMax = (selections, item) => {
    if (statusSubmitMax.length > 0) {
      statusSubmitMax[0].value == item.value
        ? setStatusSubmitMax([])
        : setStatusSubmitMax([item]);
    } else {
      setStatusSubmitMax([item]);
      setStatusErrorMax(false);
    }
  };

  const getErrorInputMin = (error) => {
    setStatusErrorMin(true);
    setErrorInputMin(error);
  };
  const onChangeInputMin = () => {
    setStatusErrorMin(false);
  };
  const getErrorInputMax = (error) => {
    setStatusErrorMax(true);
    setErrorInputMax(error);
  };
  const onChangeInputMax = () => {
    setStatusErrorMax(false);
  };

  const getEntryDateInput = (data) => {
    let EntryDate = new Date(`${data.year}-${data.month}-${data.day}`);
    setMinInput(EntryDate);
  };
  const getPeriodOfStayInput = (data) => {
    let PeriodOfStay = new Date(`${data.year}-${data.month}-${data.day}`);
    setMaxInput(PeriodOfStay);
  };
  useImperativeHandle(ref, () => ({
    getValueFormInputDate() {
      if (statusSubmitMin.length === 1 && statusSubmitMax.length === 1) {
        setValueRowItem(global.t('lable_no_care'));
        return setIsShowPopup(!isShowPopup);
      }
      let min = 0;
      let max = 0;
      let showMinValue = global.t('lable_no_care');
      let showMaxValue = global.t('lable_no_care');

      if (statusSubmitMin.length === 0 && minInput != null) {
        min = minInput;
        showMinValue = moment(minInput).format('YYYY-MM-DD');
      }
      if (statusSubmitMax.length === 0 && maxInput != null) {
        max = maxInput;
        showMaxValue = moment(maxInput).format('YYYY-MM-DD');
      }
      let minCompare =
        min != 0 ? Number(moment(minInput).format('YYYYMMDD')) : 0;
      let maxCompare =
        max != 0 ? Number(moment(maxInput).format('YYYYMMDD')) : 25001212;
      console.log('min', minCompare, 'max', maxCompare);

      if (
        min === 0 &&
        max === 0 &&
        timeMinAccepted === null &&
        timeMaxAccepted === null
      ) {
        setStatusErrorMax(true);
        setErrorInputMax(global.t('please_input'));
      } else {
        if (minCompare < maxCompare) {
          setMinInput(null);
          setMaxInput(null);
          setTimeMinAccepted(min != 0 ? minCompare : null);
          setTimeMaxAccepted(max != 0 ? maxCompare : null);
          setValueRowItem(`${showMinValue} ~ ${showMaxValue}`);
          console.log(showMinValue, showMaxValue);
          onChange({
            min: min,
            max: max,
          });
          setIsShowPopup(!isShowPopup);
        } else {
          setStatusErrorMax(true);
          setErrorInputMax(global.t('error_input_sort'));
        }
      }
    },
  }));

  return (
    <View style={styles.containerScroll}>
      <View style={[styles.wrapperVertical, { paddingBottom: 30 }]}>
        <View style={{ marginBottom: 0 }}>
          <Text style={styles.textFromTo}>{global.t('from')}</Text>
          <View>
            <SelectMultiple
              style={{
                flexGrow: 0,
                flexShrink: 0,
                position: 'relative',
                left: -10,
              }}
              items={[defaultNullData]}
              selectedItems={statusSubmitMin}
              onSelectionsChange={onSingleSelectionSubmitMin}
              keyExtractor={(index) => {
                index.toString();
              }}
              rowStyle={styles.rowCheckbox2}
              labelStyle={styles.labelRow}
              selectedCheckboxSource={onl}
              checkboxSource={off}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <DateInput
              isFromProfile={true}
              onChangeInput={onChangeInputMin}
              minYear={
                attributeKey == 'profile.entryDate' ||
                attributeKey == 'entryDate'
                  ? true
                  : false
              }
              maxYear={
                attributeKey == 'profile.periodOfStay' ||
                attributeKey == 'periodOfStay'
                  ? true
                  : false
              }
              disableInput={statusSubmitMin.length === 0 ? false : true}
              currentTime={timeMinAccepted ? timeMinAccepted.toString() : null}
              getErrorInput={getErrorInputMin}
              getDataBirthday={(val) => getEntryDateInput(val)}
            />
            {statusErrorMin && (
              <Text style={styles.textError}>{errorInputMin}</Text>
            )}
          </View>
        </View>
        <View>
          <Text style={styles.textFromTo}>{global.t('to')}</Text>
          <View
            style={{
              width: width - 100,
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <SelectMultiple
              style={{
                flexGrow: 0,
                flexShrink: 0,
                position: 'relative',
                left: -10,
              }}
              items={[defaultNullData]}
              selectedItems={statusSubmitMax}
              onSelectionsChange={onSingleSelectionSubmitMax}
              keyExtractor={(index) => {
                index.toString();
              }}
              rowStyle={[styles.rowCheckbox2]}
              labelStyle={styles.labelRow}
              // checkboxStyle={styles.checkbox}
              // selectedRowStyle={styles.selectedRow}
              selectedCheckboxSource={onl}
              checkboxSource={off}
            />
          </View>
          <DateInput
            isFromProfile={true}
            disableInput={statusSubmitMax.length === 0 ? false : true}
            onChangeInput={onChangeInputMax}
            minYear={
              attributeKey == 'profile.entryDate' || attributeKey == 'entryDate'
                ? true
                : false
            }
            maxYear={
              attributeKey == 'profile.periodOfStay' ||
              attributeKey == 'periodOfStay'
                ? true
                : false
            }
            currentTime={timeMaxAccepted ? timeMaxAccepted.toString() : null}
            getErrorInput={getErrorInputMax}
            getDataBirthday={(val) => getPeriodOfStayInput(val)}
          />
          {statusErrorMax && (
            <Text style={styles.textError}>{errorInputMax}</Text>
          )}
        </View>
      </View>
    </View>
  );
});
