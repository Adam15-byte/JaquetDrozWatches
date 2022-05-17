import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, SIZES, FONTS } from "../../assets/consts/consts";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  FadeOut,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { removeFromBag } from "../features/shoppingBag";

const WatchInShoppingBag = ({
  id,
  collection,
  watchname,
  price,
  image,
  size,
  quantity,
}) => {
  const dispatch = useDispatch();

  const clamp = (value, min, max) => {
    "worklet";
    return Math.max(Math.min(value, min), max);
  };
  const translateX = useSharedValue(0);
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.x = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = clamp(
        event.translationX + context.x,
        0,
        -SIZES.SCREEN_WIDTH * 0.2
      );
    },
    onEnd: () => {
      if (translateX.value > -SIZES.SCREEN_WIDTH * 0.1)
        translateX.value = withTiming(0);
      if (translateX.value <= -SIZES.SCREEN_WIDTH * 0.1)
        translateX.value = withTiming(-SIZES.SCREEN_WIDTH * 0.2);
    },
  });
  const animatedTranslationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  return (
    <Animated.View exiting={FadeOut}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.container, animatedTranslationStyle]}>
          <Image
            source={image}
            style={styles.watchimage}
            resizeMode="contain"
          />
          <View style={styles.greycontainer}>
            <View style={styles.textsContainer}>
              <Text style={styles.watchnameText}>{watchname}</Text>
              <View style={styles.sizePriceContainer}>
                <Text style={styles.dataText}>Size: {size}</Text>
                <Text style={styles.dataText}>$ {price}</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View style={styles.trashContainer}>
        <TouchableWithoutFeedback onPress={() => dispatch(removeFromBag(id))}>
          <Feather name="trash-2" size={30} color={COLORS.golden} />
        </TouchableWithoutFeedback>
      </Animated.View>
    </Animated.View>
  );
};

export default WatchInShoppingBag;

const styles = StyleSheet.create({
  container: {
    width: SIZES.SCREEN_WIDTH * 0.8,
    height: 100,
    justifyContent: "center",
    marginBottom: 20,
    zIndex: 10,
  },
  greycontainer: {
    height: 95,
    width: SIZES.SCREEN_WIDTH * 0.8,
    backgroundColor: COLORS.darkgrey,
    borderRadius: 20,
    paddingLeft: 120,
  },
  watchimage: {
    position: "absolute",
    height: 100,
    width: 100,
    left: 15,
    zIndex: 100,
  },
  sizePriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 30,
  },
  textsContainer: {
    width: SIZES.SCREEN_WIDTH * 0.8 - 130,
    height: "100%",
    paddingVertical: 15,
    justifyContent: "space-between",
  },
  watchnameText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
  dataText: {
    ...FONTS.h5,
    color: COLORS.white,
  },
  trashContainer: {
    position: "absolute",
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 65,
    zIndex: 1,
  },
});
