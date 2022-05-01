import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../../assets/consts/consts";
import { Touchable } from "react-native-web";
import { TouchableOpacity } from "react-native-gesture-handler";
import RectGreyButton from "../components/RectGreyButton";

const BrowseScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topBarContainer}>
        <View style={styles.topTexts}>
          <Text style={styles.headerText}>Store Online</Text>
          <Text style={styles.subheaderText}>Easy Shopping</Text>
        </View>
        <RectGreyButton
          featherIconName="shopping-cart"
          onPress={() => console.log("cart pressed")}
        />
      </View>
    </View>
  );
};

export default BrowseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.SCREEN_WIDTH,
    paddingTop: 70,
    paddingBottom: 50,
    alignItems: "center",
  },
  topBarContainer: {
    flexDirection: "row",
    height: 70,
    width: SIZES.SCREEN_WIDTH * 0.8,
    justifyContent: "space-between",
  },
  topTexts: {
    height: "80%",
    justifyContent: "space-around",
  },
  headerText: {
    color: COLORS.white,
    ...FONTS.h2,
  },
  subheaderText: {
    color: COLORS.white,
    ...FONTS.h4,
  },
});
