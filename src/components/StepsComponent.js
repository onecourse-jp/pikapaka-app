import React, {useState} from "react";
import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {useThemeColors, useThemeFonts, CheckBox} from "react-native-theme-component";

export default function StepsComponent({currentStep = 1, isStepSchedule = false, isStepAll = false}) {
  const fonts = useThemeFonts();
  const colors = useThemeColors();
  const StepServiceForm = ["診療科目", "予約日時", "予約情報", "内容確認", "完了"];
  const StepServiceSchedule = ["入力", "内容確認", "完了"];
  const StepAll = ["予約申込", "問診票", "診察", "お会計"];
  let DataStep = [];
  if (isStepSchedule) {
    DataStep = StepServiceSchedule;
  } else if (isStepAll) {
    DataStep = StepAll;
  } else {
    DataStep = StepServiceForm;
  }

  return (
    <View style={{flexDirection: "row", paddingTop: 16, justifyContent: "center", alignItems: "center", marginBottom: 21}}>
      {DataStep.map((item, index) => {
        return (
          <View key={`step-${index}`} style={{flexDirection: "column", alignItems: "center"}}>
            <View
              style={{
                position: "relative",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: 340 / DataStep.length,
                marginBottom: 8,
              }}
            >
              {index === currentStep - 1 && (
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: colors.headerComponent,
                    borderWidth: 1,
                    borderColor: colors.headerComponent,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      paddingLeft: 2,
                      fontFamily: fonts.Hiragino,
                      fontWeight: "bold",
                      lineHeight: 12,
                      color: colors.white,
                    }}
                  >
                    {index + 1}
                  </Text>
                </View>
              )}
              {index !== currentStep - 1 && (
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: colors.white,
                    borderWidth: 1,
                    borderColor: colors.headerComponent,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      paddingLeft: 2,
                      fontFamily: fonts.Hiragino,
                      fontWeight: "bold",
                      lineHeight: 12,
                      color: colors.headerComponent,
                    }}
                  >
                    {index + 1}
                  </Text>
                </View>
              )}

              <View
                style={{
                  width: index < DataStep.length - 1 ? 340 / DataStep.length / 2 : 0,
                  height: 1,
                  backgroundColor: index < currentStep - 1 ? colors.headerComponent : colors.gray4,
                  position: "absolute",
                  left: (170 / DataStep.length) * 1.5,
                  zIndex: -1,
                }}
              ></View>
            </View>
            <Text
              style={{
                color: index !== currentStep - 1 ? colors.gray7 : colors.headerComponent,
                fontSize: 12,
                fontWeight: index !== currentStep - 1 ? "500" : "700",
              }}
            >
              {item}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({});
