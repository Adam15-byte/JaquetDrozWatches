import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../assets/consts/consts";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { watches } from "../../assets/data/WatchesData";
import { useSelector } from "react-redux";

const ZoomView = ({
  zoomViewVisible,
  positionY,
  positionX,
  rotateX,
  rotateY,
}) => {
  const currentWatch = useSelector(
    (state) => state.watchDisplayed.collectionNumber
  );
  const currentColor = useSelector((state) => state.watchDisplayed.colorIndex);
  const animatedForMovingAround = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value - SIZES.SCREEN_WIDTH / 2 },
        { translateY: positionY.value - 140 },
        { rotate: (rotateX.value + rotateY.value) / 400 },
      ],
    };
  });
  const zoomedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: -positionX.value * 1.1 },
        { translateY: -positionY.value * 1.1 },
        { translateX: SIZES.SCREEN_WIDTH / 2 },
        { translateY: SIZES.SCREEN_HEIGHT / 2 },
      ],
    };
  });
  return (
    <>
      {zoomViewVisible === true && (
        <Animated.View style={[styles.container, animatedForMovingAround]}>
          <Animated.View style={zoomedImageStyle}>
            <Image
              source={watches[currentWatch].image[currentColor]}
              style={styles.imageinside}
              resizeMode="contain"
            />
          </Animated.View>
        </Animated.View>
      )}
    </>
  );
};

export default ZoomView;

const styles = StyleSheet.create({
  container: {
    height: SIZES.SCREEN_HEIGHT / 6,
    aspectRatio: 1,
    borderRadius: SIZES.SCREEN_HEIGHT / 12,
    position: "absolute",
    zIndex: 99,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.white,
    backgroundColor: COLORS.white,
  },
  imageinside: {
    height: SIZES.SCREEN_HEIGHT / 2,
    aspectRatio: 1,
    borderRadius: SIZES.SCREEN_HEIGHT / 20,
    transform: [{ rotate: "-45deg" }],
  },
});
