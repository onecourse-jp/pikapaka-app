import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: "column", position: "relative"},
  introView: {flexDirection: "column", alignItems: "center"},
  introCoinMarket: {padding: 20},
  textTitle: {color: "white", fontSize: 19, fontWeight: "bold"},
  viewItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#46515E",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  itemWallet: {flexDirection: "column", alignItems: "center"},
  listItemWallet: {flexDirection: "row", justifyContent: "space-between"},
  textItemWallet: {fontSize: 10, fontWeight: "500", color: "white", marginTop: 14},
});

export default styles;
