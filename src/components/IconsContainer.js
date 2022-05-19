import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS, SIZES } from "../../assets/consts/consts";
import { Feather } from "@expo/vector-icons";

const IconsContainer = ({ currentViewingMode, changeCurrentViewingMode }) => {
  const [opacityState1, setOpacityState1] = useState(0.8);
  const [opacityState2, setOpacityState2] = useState(0.3);
  const opacityFunction = () => {
    if (currentViewingMode === 1) {
      setOpacityState1((prevState) => 0.8);
      setOpacityState2((prevState) => 0.3);
    }
    if (currentViewingMode === 2) {
      setOpacityState1((prevState) => 0.3);
      setOpacityState2((prevState) => 0.8);
    }
  };
  useEffect(() => {
    opacityFunction();
  }, [currentViewingMode]);
  return (
    <View>
      <View style={styles.iconsContainer}>
        <TouchableWithoutFeedback onPress={() => changeCurrentViewingMode(1)}>
          <View
            style={[styles.singleIconContainer, { opacity: opacityState1 }]}
          >
            <Feather name="rotate-cw" size={26} color={COLORS.white} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => changeCurrentViewingMode(2)}>
          <View
            style={[styles.singleIconContainer, { opacity: opacityState2 }]}
          >
            <Feather name="search" size={26} color={COLORS.white} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.textContainer}>
        {currentViewingMode === 1 && (
          <Text style={styles.textBelowicons}>Touch arrow to rotate</Text>
        )}
        {currentViewingMode === 2 && (
          <Text style={styles.textBelowicons}>Touch image to zoom</Text>
        )}
      </View>
    </View>
  );
};

export default IconsContainer;

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: "row",
    width: SIZES.SCREEN_WIDTH * 0.8,
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
  },
  singleIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 26,
  },
  textBelowicons: {
    color: COLORS.white,
    ...FONTS.h5,
  },
  textContainer: {
    marginTop: 10,
  },
});
