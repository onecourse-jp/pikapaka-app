import React, { useContext,useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Linking
} from "react-native";
import LocalizationContext from "@context/LocalizationContext";
import Colors from "@config/styles";
import ButtonTheme from "@components/buttons/ButtonTheme";

export default function ModalScreen({ navigation, route }) {
  const { t } = useContext(LocalizationContext);
  const titleHeader = route.params.titleHeader;
  const text = route.params.text;
  const titleAction = route.params.titleAction;
  const titleAction1 = route.params.titleAction;
  const HandleAction = () => {
    navigation.goBack();
    setTimeout(() => {
      navigation.navigate("SignUpSuccess");
    },500)
    
  };
  const openSettingApp = useCallback(async () => {
   await Linking.openSettings();
   navigation.goBack();
   setTimeout(() => {
     navigation.navigate("SignUpSuccess");
   },500)
  },[]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        ]}
        onPress={navigation.goBack}
      />
      <View style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.textHeader}>{t(titleHeader)}</Text>
          <Text style={styles.text}>{t(text)}</Text>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image source={require("@assets/images/img3x/logoPopupGPS.png")} />
        </View>
        <View style={styles.viewButton}>
          <View style={{ flex: 1, paddingRight: 8 }}>
            <ButtonTheme
              title={t(titleAction1)}
              hasBorder={true}
              textColor={Colors.color.COLOR_PRIMARY}
              colorBorder={Colors.color.COLOR_PRIMARY}
              HandleAction={() => HandleAction()}
              showTitle={true}
            />
          </View>
          <View style={{ flex: 1, paddingLeft: 8 }}>
            <ButtonTheme
              title={t(titleAction)}
              textColor={Colors.color.COLOR_WHITE}
              HandleAction={() => openSettingApp()}
              showTitle={true}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    backgroundColor: Colors.color.COLOR_WHITE,
    justifyContent: "space-between",

    borderRadius: 15,
    height: 400,
  },
  touch: {
    padding: 8,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    paddingHorizontal: 10,
  },
  viewButton: {
    flexDirection: "row",
    paddingBottom: 16,
  },
  textHeader:{
    fontSize: 16,
    fontWeight: "bold",
    padding:16
  },
  text:{
    fontSize: 14,
  }
});
