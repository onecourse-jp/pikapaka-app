import React, {useEffect, useState, useRef} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, SafeAreaView, useWindowDimensions, Dimensions} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {TabView, TabBar} from "react-native-tab-view";
import HistorySkinCare from "./HistorySkinCare";
import {useFocusEffect} from "@react-navigation/native";

const {width} = Dimensions.get("window");
export default function History() {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const [widthTab, setWidthTab] = useState(0);
  const layout = useWindowDimensions();
  const refTab = useRef(null);
  const [index, setIndex] = React.useState(0);
  const listColor = [
    colors.headerComponent,
    colors.buttonSkincare,
    colors.textDiet,
    colors.colorPill,
    colors.colorED07,
    colors.colorAGA07,
    colors.colorAGA07,
  ];
  const [routes] = React.useState([
    {key: "first", title: "全て", icon: null},
    {key: "second", title: "スキンケア", icon: require("@assets/images/icons/ic_tab_1.png")},
    {key: "third", title: "ダイエット", icon: require("@assets/images/icons/ic_tab_2.png"), disable: true},
    {key: "fourth", title: "ピル", icon: require("@assets/images/icons/ic_tab_3.png")},
    {key: "fifth", title: "ED", icon: require("@assets/images/icons/ic_tab_4.png")},
    {key: "sixth", title: "AGA", icon: require("@assets/images/icons/ic_tab_5.png"), disable: true},
  ]);
  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case "first": {
        return <HistorySkinCare />;
      }
      case "second": {
        return <HistorySkinCare category_medical={1} />;
      }
      case "third": {
        return <HistorySkinCare category_medical={2} />;
      }
      case "fourth": {
        return <HistorySkinCare category_medical={3} />;
      }
      case "fifth": {
        return <HistorySkinCare category_medical={4} />;
      }
      case "sixth": {
        return <HistorySkinCare category_medical={5} />;
      }
    }
  };
  useEffect(() => {
    let newWidth = 0;
    const centerView = setTimeout(() => {
      if (refTab?.current?.measuredTabWidths) {
        Object.keys(refTab?.current?.measuredTabWidths).map((item) => {
          newWidth += Number(refTab?.current?.measuredTabWidths[item]);
        });
        setWidthTab(newWidth);
        clearTimeout(centerView);
      }
    }, 200);
    setIndex(1)
  }, []);
  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View
        style={{
          flexDirection: "row",
          marginBottom: 20,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: colors.colorHome04,
          maxHeight: 66,
        }}
      >
        {props.navigationState.routes.map((route, i) => {
          const backgroundColor = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) => (inputIndex === i ? listColor[index] : colors.colorHome02)),
          });
          return (
            <TouchableOpacity
              onPress={() => setIndex(i)}
              key={`step-${i}`}
              disabled={route.disable}
              style={{
                flexDirection: "column",
                width: width / 6,
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: i + 1 < props.navigationState.routes.length ? 1 : 0,
                borderRightColor: colors.white,
                paddingVertical: 7,
                backgroundColor: index === i ? listColor[index] : route.disable ? colors.gray7 : colors.colorHome02,
              }}
            >
              <View style={{height: route.icon ? 20 : 10}}>{route.icon && <Image source={route.icon} />}</View>
              <Text style={{color: colors.white, fontSize: 11, lineHeight: 12, fontWeight: "700", marginTop: 5}}>{route.title}</Text>
              {route?.disable && <Text style={{color:"white", fontSize: 10}}>(準備中)</Text>}
              {route.icon === null && <View style={{height: 10}}>{route.icon && <Image source={route.icon} />}</View>}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={styles.container}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          style={{flex: 1}}
          renderTabBar={renderTabBar}
          swipeEnabled={false}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    height: "100%",
  },
});
