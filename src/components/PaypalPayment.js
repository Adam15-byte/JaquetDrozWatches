import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SIZES, COLORS, FONTS } from "../../assets/consts/consts";
import { Feather } from "@expo/vector-icons";

const PaypalPayment = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Paypal.png")}
        resizeMode="contain"
        style={styles.paypalLogo}
      />
      <View style={styles.middleTextsContainer}>
        <Text style={styles.middleText}>You will be redirected to Paypal</Text>
      </View>
      <View style={styles.exitIconContainer}>
        <Feather name="log-out" size={30} color={COLORS.white} />
      </View>
    </View>
  );
};

export default PaypalPayment;

const styles = StyleSheet.create({
  container: {
    width: SIZES.SCREEN_WIDTH * 0.8,
    height: SIZES.SCREEN_HEIGHT * 0.25,
    marginVertical: 15,
    paddingRight: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  paypalLogo: {
    height: SIZES.SCREEN_HEIGHT * 0.05,
    width: SIZES.SCREEN_WIDTH * 0.2,
  },
  middleTextsContainer: {
    width: SIZES.SCREEN_WIDTH * 0.4,
    height: SIZES.SCREEN_HEIGHT * 0.25,
    alignItems: "center",
    justifyContent: "center",
  },
  middleText: {
    color: COLORS.white,
    ...FONTS.h3,
    textAlign: "center",
  },
  exitIconContainer: {
    width: SIZES.SCREEN_WIDTH * 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
});
