import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../../assets/consts/consts";
import { useSelector, useDispatch } from "react-redux";
import RectGreyButton from "../components/RectGreyButton";

const BagScreen = ({ changeScreen }) => {
  const shoppingBag = useSelector((state) => state.shoppingBag);

  return (
    <View style={styles.container}>
      <View style={styles.topBarContainer}>
        <RectGreyButton
          onPress={() => changeScreen(2)}
          isShoppingBag={false}
          featherIconName="chevron-left"
        />
        <View style={styles.paymentTitles}>
          <Text style={styles.paymentTitleText}>Payment</Text>
          <Text style={styles.paymentSubtitleText}>Convenient Payment</Text>
        </View>
        <RectGreyButton
          onPress={() => console.log("options pressed")}
          isShoppingBag={false}
          featherIconName="more-horizontal"
        />
      </View>
      <Text>BagScreen</Text>
    </View>
  );
};

export default BagScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.SCREEN_WIDTH,
    paddingTop: 70,
    paddingBottom: 50,
    alignItems: "center",
  },
  topBarContainer: {
    width: SIZES.SCREEN_WIDTH * 0.8,
    maxHeight: 70,
    flexDirection: "row",
  },
  paymentTitles: {
    marginLeft: 15,
    marginRight: "auto",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  paymentTitleText: {
    ...FONTS.h2,
    color: COLORS.white,
  },
  paymentSubtitleText: {
    ...FONTS.h4,
    color: COLORS.white,
  },
});
