import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, TextInput, Image} from "react-native";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import DropDownPicker from "react-native-dropdown-picker";
import Modal from "react-native-modal";

const {width, height} = Dimensions.get("window");

export default function ItemForm({item, valueData = null, changeData = () => {}, defaultValue = null, valueModal = null}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const [showPopup, setShowPopup] = useState(false);
  const [value, setValue] = useState(valueModal);

  useEffect(() => {
    setValue(valueModal);
  }, [valueModal]);

  const actionCancle = () => {
    setShowPopup(false);
  };
  const actionChoose = () => {
    changeData(value);
    console.log("changeData", changeData, value);
    setShowPopup(false);
  };

  return (
    <>
      <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
        {item.option ? (
          <>
            <TouchableOpacity
              style={{marginRight: 6}}
              onPress={() => {
                setShowPopup(true);
              }}
            >
              {valueData === 1 && <Text>有</Text>}
              {valueData === 2 && <Text>無</Text>}
              {valueData === null && <Text>{item.placeholder}</Text>}
            </TouchableOpacity>
            <Image style={{marginRight: 2}} source={require("@assets/images/icons/ic_next_gray.png")} />
          </>
        ) : (
          <TextInput
            style={[
              styles.textInputController,
              {
                color: colors.primaryColor,
                backgroundColor: colors.white,
                marginRight: 0,
              },
            ]}
            keyboardType={item.key === "phone_number" ? "number-pad" : "default"}
            value={valueData || defaultValue}
            placeholder={item.placeholder}
            placeholderTextColor={colors.textPlaceholder}
            onChangeText={(text) => {
              changeData(text);
            }}
            multiline={true}
          />
        )}
      </View>
      <Modal
        isVisible={showPopup}
        animationInTiming={200}
        style={{
          margin: 20,
          maxWidth: 600,
          width: width - 40,
        }}
        animationOutTiming={200}
        backdropTransitionInTiming={200}
        backdropTransitionOutTiming={200}
      >
        <View
          style={{
            position: "relative",
            height: height,
            width: "100%",
          }}
        >
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: 200,
              top: (height - 200) / 2,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                flexDirection: "column",
                paddingHorizontal: 30,
                width: "100%",
                minHeight: 200,
                paddingVertical: 22,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.NSregular,
                  fontSize: 24,
                  fontWeight: "bold",
                  lineHeight: 28,
                  marginBottom: 16,
                  textAlign: "center",
                }}
              >
                {item.label}
              </Text>
              <View>
                <TouchableOpacity style={{flexDirection: "row", alignItems: "center", paddingVertical: 12}} onPress={() => setValue(1)}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      borderWidth: value === 1 ? 0 : 1,
                      borderColor: colors.textGray,
                      marginRight: 10,
                      backgroundColor: value === 1 ? colors.textBlue : colors.white,
                    }}
                  ></View>
                  <Text style={{fontFamily: fonts.NSregular, fontSize: 19, lineHeight: 20}}>有</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: "row", alignItems: "center", paddingVertical: 12}} onPress={() => setValue(2)}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      borderWidth: value === 2 ? 0 : 1,
                      borderColor: colors.textGray,
                      marginRight: 10,
                      backgroundColor: value === 2 ? colors.textBlue : colors.white,
                    }}
                  ></View>
                  <Text style={{fontFamily: fonts.NSregular, fontSize: 19, lineHeight: 20}}>無</Text>
                </TouchableOpacity>
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
                  onPress={actionCancle}
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
                  onPress={actionChoose}
                >
                  <Text style={{fontFamily: fonts.NSregular, fontSize: 19, lineHeight: 20, color: colors.textBlue}}>選択</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: "column",
  },
  viewTextInput: {
    paddingHorizontal: 10,
    marginTop: 20,
    borderColor: "black",
    borderRadius: 10,
  },
  textError: {color: "red", paddingBottom: 12, paddingTop: 6},
  textInputController: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    margin: 0,
    textAlignVertical: "top",
    lineHeight: 21,
    maxWidth: 160,
    minHeight: 20,
    height: "100%",
    fontSize: 15,
    textAlign: "right",
  },
});
