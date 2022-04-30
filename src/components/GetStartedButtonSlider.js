import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { SIZES, COLORS, FONTS } from "../../assets/consts/consts";

const GetStartedButtonSlider = ({ textOpacity }) => {
  const unlockAndFadeCurrentScreen = () => {
    "worklet";
    textOpacity.value = withTiming(0);
  };
  const maxSlideWidth = SIZES.SCREEN_WIDTH * 0.8 - 180;
  const translateButtonX = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.x = translateButtonX.value;
    },
    onActive: (event, context) => {
      translateButtonX.value = Math.max(
        Math.min(event.translationX + context.x, maxSlideWidth),
        0
      );
    },
    onEnd: (event) => {
      if (translateButtonX.value < maxSlideWidth - 40)
        return (translateButtonX.value = withTiming(0));
      if (translateButtonX.value >= maxSlideWidth - 40) {
        translateButtonX.value = withTiming(maxSlideWidth);
        unlockAndFadeCurrentScreen();
      }
    },
  });
  const getStartedButtonAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateButtonX.value }],
    };
  });
  const goldenFillingWidthAnimation = useAnimatedStyle(() => {
    const width = interpolate(
      translateButtonX.value,
      [0, SIZES.SCREEN_WIDTH * 0.8],
      [100, SIZES.SCREEN_WIDTH]
    );
    return {
      width: width,
    };
  });
  // Dummy array of four, used to map arrow icons
  const newArrayOfFour = new Array(4).fill(0);
  return (
    <View style={styles.sliderContainer}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[styles.getStartedButton, getStartedButtonAnimation]}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View
        style={[styles.goldenFilling, goldenFillingWidthAnimation]}
      />
      <View style={styles.continueArrows}>
        {newArrayOfFour.map((_, index) => (
          <View
            key={`arrow-${index}`}
            style={[styles.arrowContainer, { opacity: 0.8 - index * 0.2 }]}
          >
            <Ionicons
              name="chevron-forward-sharp"
              size={20}
              color={COLORS.white}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default GetStartedButtonSlider;

const styles = StyleSheet.create({
  sliderContainer: {
    width: SIZES.SCREEN_WIDTH * 0.8,
    height: 70,
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "row",
    borderRadius: 30,
    backgroundColor: COLORS.darkgrey,
  },
  getStartedButton: {
    width: 180,
    height: "100%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.golden,
    zIndex: 5,
  },
  getStartedText: {
    color: COLORS.black,
    ...FONTS.h3,
  },
  continueArrows: {
    flexDirection: "row",
    height: "100%",
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  arrowContainer: {
    marginRight: -3,
    zIndex: 1,
  },
  goldenFilling: {
    position: "absolute",
    backgroundColor: COLORS.golden,
    height: "100%",
    aspectRatio: 1,
    borderRadius: 30,
    zIndex: 1,
  },
});
