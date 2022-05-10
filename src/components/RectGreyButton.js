import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../assets/consts/consts";
import { useSelector } from "react-redux";
import Animated, { FadeIn } from "react-native-reanimated";

const RectGreyButton = ({ featherIconName, onPress, isShoppingBag }) => {
  const shoppingBag = useSelector((state) => state.shoppingBag);
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      {isShoppingBag === true ? (
        shoppingBag.length > 0 ? (
          <Animated.View entering={FadeIn} style={styles.goldenCircle}>
            <Text style={styles.numberText}>{shoppingBag.length}</Text>
          </Animated.View>
        ) : null
      ) : null}
      <Feather name={featherIconName} size={24} color={COLORS.white} />
    </TouchableOpacity>
  );
};

export default RectGreyButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.darkgrey,
    height: 65,
    width: 65,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  goldenCircle: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.golden,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
    zIndex: 100,
  },
  numberText: {
    color: COLORS.white,
    ...FONTS.h5,
    fontWeight: "900",
  },
});
