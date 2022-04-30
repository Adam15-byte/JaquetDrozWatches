import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SIZES } from "../../assets/consts/consts";

const WatchOnLaunch = ({ item, index, translateX }) => {
  const animatedOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [
        (index - 0.3) * SIZES.SCREEN_WIDTH,
        index * SIZES.SCREEN_WIDTH,
        (index + 0.3) * SIZES.SCREEN_WIDTH,
      ],
      [0.4, 1, 0.2],
      Extrapolate.CLAMP
    );
    return { opacity };
  });
  return (
    <Animated.View style={[styles.imageContainer, animatedOpacity]}>
      <Image source={item} style={styles.image} resizeMode="contain" />
    </Animated.View>
  );
};

export default WatchOnLaunch;

const styles = StyleSheet.create({
  imageContainer: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    width: SIZES.SCREEN_WIDTH,
    height: SIZES.SCREEN_HEIGHT * 0.8,
    marginTop: -50,
  },
  image: {
    position: "absolute",
    width: SIZES.SCREEN_WIDTH * 1.25,
  },
});
