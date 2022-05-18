import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  runOnJS,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { SIZES, COLORS, FONTS } from "../../assets/consts/consts";

const GetStartedButtonSlider = ({ textOpacity, imageOpacity, changeScreen }) => {
  const maxSlideWidth = SIZES.SCREEN_WIDTH * 0.8 - 180;
  // Ref Value for position of the button
  const translateButtonX = useSharedValue(0);
  // Ref Value for Opacity of the entire button, to enable it's FadeOut
  const sliderOpacity = useSharedValue(1);
  const animatedSliderOpacity = useAnimatedStyle(() => {
    return { opacity: sliderOpacity.value };
  });
  // Function performed at the release of button. Handles changing opacity of all elements and changing the state responsible for screen display.
  const unlockAndFadeCurrentScreen = () => {
    "worklet";
    textOpacity.value = withTiming(0);
    imageOpacity.value = withDelay(300, withTiming(0));
    sliderOpacity.value = withDelay(600, withTiming(0));
  };
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
        //  runOnJS(changeScreen)(2);
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
  ////
  // Dummy array of four, used to map arrow icons. Animated style based on  position of button that changes opacity.
  ////
  const newArrayOfFour = new Array(4).fill(0);
  const arrowsAnimatedOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateButtonX.value,
      [0, maxSlideWidth - 50],
      [0.2, 1]
    );
    return { opacity };
  });
  return (
    <Animated.View style={[styles.sliderContainer, animatedSliderOpacity]}>
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
      <Animated.View style={[styles.continueArrows, arrowsAnimatedOpacity]}>
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
      </Animated.View>
    </Animated.View>
  );
};;;

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
