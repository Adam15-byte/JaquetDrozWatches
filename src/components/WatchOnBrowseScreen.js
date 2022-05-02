import "react-native-gesture-handler";
import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../assets/consts/consts";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const WatchOnBrowseScreen = ({ item, index, rotateX, rotateY }) => {
  // rotation values come from BrowseScreen, from the circle with arrows
  const animatedRotatingStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: (rotateX.value + rotateY.value) / 400 }],
    };
  });
  return (
    <Animated.View style={[styles.imageContainer, animatedRotatingStyle]}>
      <Image style={styles.image} source={item.image[0]} resizeMode="contain" />
    </Animated.View>
  );
};

export default WatchOnBrowseScreen;

const styles = StyleSheet.create({
  imageContainer: {
    width: SIZES.SCREEN_WIDTH,
    height: SIZES.SCREEN_HEIGHT * 0.5,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  image: {
    transform: [{ rotate: "-45deg" }],
    height: SIZES.SCREEN_HEIGHT * 0.27,
    shadowColor: COLORS.black,
    shadowOffset: { height: 15, width: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 25,
  },
});
