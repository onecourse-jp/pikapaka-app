import React, {useEffect, useState, useRef} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, SafeAreaView, useWindowDimensions} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {TabView, TabBar} from "react-native-tab-view";
import HistorySkinCare from "./HistorySkinCare";
import {useFocusEffect} from "@react-navigation/native";
export default function History() {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const [widthTab, setWidthTab] = useState(0);
  const layout = useWindowDimensions();
  const refTab = useRef(null);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: "first", title: "全て"},
    {key: "second", title: "スキンケア"},
    {key: "third", title: "ダイエット"},
    {key: "fourth", title: "ピル"},
    {key: "fifth", title: "ED"},
    {key: "sixth", title: "AGA"},
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
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={styles.container}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          style={{flex: 1}}
          renderTabBar={(props) => {
            return (
              <TabBar
                {...props}
                ref={refTab}
                style={[
                  {
                    backgroundColor: colors.white,
                    paddingHorizontal: widthTab !== 0 ? (layout.width - widthTab) / 2 : 0,
                    marginHorizontal: 0,
                    marginBottom: 20,
                  },
                ]}
                labelStyle={{
                  color: "black",
                  fontSize: 14,

                  lineHeight: 22,
                  width: "auto",
                }}
                indicatorStyle={{
                  backgroundColor: colors.textBlue,
                }}
                indicatorContainerStyle={{left: widthTab !== 0 ? (layout.width - widthTab) / 2 : 16}}
                tabStyle={{elevation: 0, paddingHorizontal: 0, width: "auto"}}
                renderLabel={({route, focused, color}) => (
                  <Text style={{color: colors.textBlack, width: "auto", letterSpacing: 0, margin: 8}} numberOfLines={1}>
                    {route.title}
                  </Text>
                )}
              />
            );
          }}
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
