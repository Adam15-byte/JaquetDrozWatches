import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SIZES, COLORS, FONTS } from "../../assets/consts/consts";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";

const ConfirmationButton = ({ bottomAnimatedOpacity }) => {
  const arrayOfFour = new Array(4).fill(0);
  return (
    <Animated.View style={[styles.container, bottomAnimatedOpacity]}>
      <Text style={styles.textStyle}>Confirmation</Text>
      <View style={styles.arrowContainer}>
        {arrayOfFour.map((_, index) => {
          return (
            <View key={`arrow-${index}`} style={{ opacity: 0.8 - index * 0.2 }}>
              <Ionicons
                name="chevron-forward-sharp"
                size={20}
                color={COLORS.black}
              />
            </View>
          );
        })}
      </View>
    </Animated.View>
  );
};

export default ConfirmationButton;

const styles = StyleSheet.create({
  container: {
    width: SIZES.SCREEN_WIDTH * 0.8,
    height: 70,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 30,
    backgroundColor: COLORS.golden,
    flexDirection: "row",
    paddingHorizontal: 30,
  },
  arrowContainer: {
    flexDirection: "row",
    width: SIZES.SCREEN_WIDTH * 0.15,
    alignItems: "center",
    justifyContent: "space-around",
  },
  textStyle: {
    ...FONTS.h3,
  },
});
