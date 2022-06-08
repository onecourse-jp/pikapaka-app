import React, {useState} from "react";
import * as RootNavigator from "src/navigation/NavigationService";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {navigationRef} from "src/navigation/NavigationService";
import MenuComponent from "./Menu";

export default function Headercomponent(props) {
  const user = useSelector((state) => state.users?.userDetails);
  const [showMenu, setShowMenu] = useState(false);
  const navigation = useNavigation();
  const colors = useThemeColors();
  const goProfileAction = () => {
    if (user) {
      navigation.navigate("ProfileStack");
    } else {
      global.alertNeedLogin();
    }
  };

  return (
    <View style={{position: "relative", zIndex: 99}}>
      <MenuComponent {...props} isShow={showMenu} setShowMenu={setShowMenu} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          height: 60,
          alignItems: "center",
          backgroundColor: colors.colorHome10,
        }}
      >
        <TouchableOpacity
          style={{height: "100%", flexDirection: "row", alignItems: "center" }}
          onPress={() => {
            const navigationCurrentName = RootNavigator?.getCurrentRoute()?.name;
            if (navigationCurrentName != "Home") {
              navigationRef.current.resetRoot({
                index: 0,
                routes: [{name: "Tabbar"}],
              });
            }
          }}
        >
          <Image style={{width: 182}} source={require("@assets/images/icons/ic_logo_top.png")} />
        </TouchableOpacity>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <TouchableOpacity style={{paddingHorizontal: 10, paddingVertical: 15}} onPress={goProfileAction}>
            <Image source={require("@assets/images/icons/ic_human_white_2.png")} />
          </TouchableOpacity>
          <TouchableOpacity style={{paddingLeft: 10, paddingVertical: 15}} onPress={() => setShowMenu(true)}>
            <Image source={require("@assets/images/icons/ic_menu_top.png")} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
