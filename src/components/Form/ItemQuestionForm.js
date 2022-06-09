import React, {useEffect, useState, useRef} from "react";
import {StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, TextInput, Image, ScrollView} from "react-native";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {styles} from "./styles/MRowItemStyles/MRowItemStyles";
import SelectMultiple from "react-native-select-multiple";
import Modal from "react-native-modal";
import onl from "@assets/images/onl.png";
import off from "@assets/images/off.png";

const {width, height} = Dimensions.get("window");

export default function ItemQuestionForm({item, valueData = null, changeData = () => {}, mutiple = false, type = "default"}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const [showPopup, setShowPopup] = useState(false);
  const [dataRender, setDataRender] = useState([
    {label: "有", value: 1},
    {label: "無", value: 2},
  ]);
  const [valueRowItem, setValueRowItem] = useState(null);
  const [listCheckbox, setListCheckbox] = useState([]);
  const refInput = useRef(null);
  const renderValueDefault = () => {
    if (item?.label == 4 && item?.value) {
      if (item?.data) {
        item.data.map((el, index) => {
          if (el.value == item.value) {
            setValueRowItem(item.data[index].label);
            setListCheckbox([{label: item.data[index].label, value: item.data[index].value}]);
          }
        });
      } else {
        setValueRowItem(item.value === 1 ? "有" : "無");
        setListCheckbox(item.value === 1 ? [{label: "有", value: 1}] : [{label: "無", value: 2}]);
      }
    }
    if (item?.label == 3 && item?.value) {
      let newValue = [];
      let newListCheckBox = [];
      if (typeof item?.value == "string" || typeof item?.value == "number") {
        item.data.map((el, index) => {
          if (el.value == item.value) {
            newValue.push(item.data[index].label);
            newListCheckBox.push({label: item.data[index].label, value: item.data[index].value});
          }
        });
      } else {
        item?.value?.map((el) => {
          newValue.push(item?.data[el]?.label);
          newListCheckBox.push({label: item?.data[el]?.label, value: item?.data[el]?.value});
        });
      }

      setValueRowItem(newValue);
      setListCheckbox(newListCheckBox);
    }
  };

  useEffect(() => {
    try {
      global.showLoadingView();
      let newDataRender = [];
      if (item?.data) {
        item?.data.map((el) => {
          newDataRender.push({label: el.label, value: el.value});
        });
      } else if (item?.content) {
        item?.content.map((el) => {
          newDataRender.push({label: el, value: el});
        });
      } else {
        newDataRender = [
          {label: "有", value: 1},
          {label: "無", value: 2},
        ];
      }
      setDataRender(newDataRender);
      global.hideLoadingView();
    } catch (error) {
      global.hideLoadingView();
    }
  }, [item]);

  useEffect(() => {
    if (dataRender.length > 0) {
      renderValueDefault();
    }
  }, [dataRender]);

  const press = () => {
    setShowPopup(!showPopup);
  };

  const onMultipleSelection = (selections, item) => {
    if (item.value === 0) {
      if (listCheckbox.length === 1) {
        setListCheckbox([]);
      } else setListCheckbox([item]);
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
  };
  const onSingleSelection = (selections, item) => {
    if (listCheckbox.length > 0) {
      listCheckbox[0].value == item.value ? setListCheckbox([]) : setListCheckbox([item]);
    } else {
      setListCheckbox([item]);
    }
  };

  const getValueForm = () => {
    console.log("listCheckbox", listCheckbox);
    let newValue = [];
    let newLabel = [];
    if (listCheckbox.length > 0) {
      for (let i = 0; i < listCheckbox.length; i++) {
        newValue.push(listCheckbox[i].value);
        newLabel.push(listCheckbox[i].label);
      }
    } else {
    }
    setValueRowItem(newLabel);
    let dataChange;
    if (type === "questionAdmin") {
      dataChange = {question_id: item.id, content_answer: newValue};
      changeData(dataChange);
    } else {
      if (item.label === 4) {
        changeData(newValue[0]);
      } else {
        changeData(newValue);
      }
    }
    setShowPopup(false);
  };
  const renderLabel = (label) => {
    return (
      <View
        style={[
          {
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "center",
          },
          styles.rowWeb,
        ]}
      >
        <Text
          style={{
            marginLeft: 10,
            paddingRight: 30,
            marginTop: Platform.OS === "android" ? -5 : 0,
            textAlign: "justify",
          }}
        >
          {label}
        </Text>
      </View>
    );
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if (item.label === 4 || item.label === 3) {
            setShowPopup(true);
          } else {
            refInput.current.focus();
          }
        }}
        style={{
          paddingVertical: 11,
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: colors.borderGrayE,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <Text
          style={{
            color: colors.textBlack,
            width: type === "questionAdmin" && (item.label === 4 || item.label === 3) ? "80%" : "40%",
            fontSize: 15,
            marginRight: 11,
            lineHeight: 21,
          }}
        >
          {item.title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            width: type === "questionAdmin" && (item.label === 4 || item.label === 3) ? "20%" : "60%",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {item.label === 4 || item.label === 3 ? (
            <>
              <View style={{marginRight: 6, minWidth: 120, flexDirection: "column"}}>
                {(valueRowItem === null || valueRowItem === undefined || valueRowItem.length == 0) && (
                  <Text style={{textAlign: "left"}}>{item?.placeholder || "選択"}</Text>
                )}
                {typeof valueRowItem == "string" ? (
                  <Text>{valueRowItem}</Text>
                ) : (
                  valueRowItem?.length > 0 &&
                  valueRowItem?.map((el, index) => {
                    return (
                      <Text key={`valueRowItem-${index}`} style={{textAlign: "left"}}>
                        {el}
                      </Text>
                    );
                  })
                )}
              </View>
              {/* <Image style={{marginRight: 2}} source={require("@assets/images/icons/ic_next_gray.png")} /> */}
            </>
          ) : (
            <TextInput
              ref={refInput}
              editable={item?.disabel ? false : true}
              style={[
                styles.textInputController,
                {
                  color: colors.primaryColor,
                  backgroundColor: colors.white,
                  marginRight: 0,
                },
              ]}
              keyboardType={item.key === "phone_number" || item.key === "postal_code" ? "number-pad" : "default"}
              value={typeof valueData === "string" ? valueData : null}
              placeholder={item?.placeholder || "○○を入力"}
              secureTextEntry={item.key === "newPassword" || item.key === "confirmPassword" ? true : false}
              // placeholder={item.placeholder}
              placeholderTextColor={colors.textPlaceholder}
              onChangeText={(text) => {
                if (type == "questionAdmin") {
                  changeData({question_id: item.id, content_answer: text});
                } else {
                  changeData(text);
                }
              }}
              multiline={true}
            />
          )}
        </View>
      </TouchableOpacity>
      <Modal
        isVisible={showPopup}
        style={{
          margin: 20,
          maxWidth: 600,
          width: width - 40,
          alignSelf: "center",
        }}
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}
      >
        <View
          style={[
            styles.modalContent,
            {
              height: 0.7 * height,
            },
          ]}
        >
          <View style={[styles.dFlex, styles.modalTitle]}>
            <Text style={[styles.modalTitleTxt]} ellipsizeMode="tail">
              {item.title}
            </Text>
            <ScrollView
              persistentScrollbar={true}
              indicatorStyle={"black"}
              contentContainerStyle={{padding: 20}}
              // containerStyle={{ paddingRight: 14 }}
              style={[styles.scrollview, {paddingBottom: 100}]}
            >
              <SelectMultiple
                items={dataRender}
                selectedItems={listCheckbox}
                renderLabel={renderLabel}
                onSelectionsChange={item.label === 3 ? onMultipleSelection : onSingleSelection}
                keyExtractor={(el) => {
                  return `selectMuti-${el.label}`;
                }}
                rowStyle={styles.rowCheckbox}
                labelStyle={styles.labelRow}
                checkboxStyle={styles.checkbox}
                // selectedCheckboxSource={onl}
                // checkboxSource={off}
                selectedRowStyle={styles.selectedRow}
              />
            </ScrollView>
          </View>
          <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 30}}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 16,
                paddingHorizontal: 18,
                paddingVertical: 12,
                borderWidth: 1,
                borderColor: colors.textGray,
                marginRight: 16,
              }}
              onPress={() => press()}
            >
              <Text style={{fontFamily: fonts.NSregular, fontSize: 19, lineHeight: 20}}>キャンセル</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 16,
                paddingHorizontal: 18,
                paddingVertical: 12,
                borderWidth: 1,
                borderColor: colors.textBlue,
              }}
              onPress={getValueForm}
            >
              <Text style={{fontFamily: fonts.NSregular, fontSize: 19, lineHeight: 20, color: colors.textBlue}}>同意</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}