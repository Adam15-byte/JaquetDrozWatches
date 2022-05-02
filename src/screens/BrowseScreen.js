import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { COLORS, FONTS, SIZES } from "../../assets/consts/consts";
import Animated, {
  scrollTo,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import RectGreyButton from "../components/RectGreyButton";
import { watches } from "../../assets/data/WatchesData";
import WatchOnBrowseScreen from "../components/WatchOnBrowseScreen";
import { Feather } from "@expo/vector-icons";
import { PanGestureHandler } from "react-native-gesture-handler";
import IconsContainer from "../components/IconsContainer";

const BrowseScreen = () => {
  // Ref and Value used to swipe left and right on the screen
  const flatListRef = useAnimatedRef();
  const scroll = useSharedValue(0);
  useDerivedValue(() => {
    scrollTo(flatListRef, scroll.value * SIZES.SCREEN_WIDTH, 0, true);
  });
  const scrollNext = () => {
    if (scroll.value <= 2) {
      scroll.value = scroll.value + 1;
    }
  };
  const scrollPrevious = () => {
    if (scroll.value >= 1) {
      scroll.value = scroll.value - 1;
    }
  };

  // Values and hooks to handle images rotation on press
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.x = rotateX.value;
      context.y = rotateY.value;
    },
    onActive: (event, context) => {
      rotateX.value = event.translationX + context.x;
      rotateY.value = event.translationY + context.y;
    },
    onEnd: () => {},
  });
  const animatedRotatingStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: (rotateX.value + rotateY.value) / 200 }],
    };
  });

  const [currentViewingMode, setCurrentViewingMode] = useState(1);
  const changeCurrentViewingMode = useCallback(
    (newState) => {
      setCurrentViewingMode((prevState) => newState);
    },
    [currentViewingMode]
  );
  return (
    <View style={styles.container}>
      <View style={styles.topBarContainer}>
        <View style={styles.topTexts}>
          <Text style={styles.headerText}>Online Store</Text>
          <Text style={styles.subheaderText}>Easy Shopping</Text>
        </View>
        <RectGreyButton
          featherIconName="shopping-cart"
          onPress={() => console.log("cart pressed")}
        />
      </View>

      {/* Icons to change between rotation and zooming */}
      <IconsContainer
        currentViewingMode={currentViewingMode}
        changeCurrentViewingMode={changeCurrentViewingMode}
      />

      {/* FlatList Displaying the watches in the center */}
      <View style={styles.flatListContainer}>
        <FlatList
          data={watches}
          renderItem={({ item, index }) => (
            <WatchOnBrowseScreen
              item={item}
              index={index}
              rotateX={rotateX}
              rotateY={rotateY}
            />
          )}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          style={{ zIndex: 5 }}
          ref={flatListRef}
        />
        <View style={styles.circleBackgroundForPhone} />
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View
            style={[styles.rotatioArrowContainer, animatedRotatingStyle]}
          >
            <Image
              source={require("../../assets/images/RotateArrow.png")}
              style={styles.rotationArrowImage}
            />
          </Animated.View>
        </PanGestureHandler>

        <View style={styles.leftRightArrowsContainer}>
          <TouchableOpacity onPress={() => scrollPrevious()}>
            <Feather name="chevron-left" size={42} color={COLORS.golden} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => scrollNext()}>
            <Feather name="chevron-right" size={42} color={COLORS.golden} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BrowseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.SCREEN_WIDTH,
    paddingTop: 70,
    paddingBottom: 50,
    alignItems: "center",
  },
  topBarContainer: {
    flexDirection: "row",
    height: 70,
    width: SIZES.SCREEN_WIDTH * 0.8,
    justifyContent: "space-between",
  },
  topTexts: {
    height: "80%",
    justifyContent: "space-around",
  },
  headerText: {
    color: COLORS.white,
    ...FONTS.h2,
  },
  subheaderText: {
    color: COLORS.white,
    ...FONTS.h5,
  },

  flatListContainer: {
    height: SIZES.SCREEN_HEIGHT * 0.5,
    width: SIZES.SCREEN_WIDTH,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  circleBackgroundForPhone: {
    position: "absolute",
    height: SIZES.SCREEN_HEIGHT * 0.25,
    borderRadius: (SIZES.SCREEN_HEIGHT * 0.3) / 2,
    aspectRatio: 1,
    backgroundColor: COLORS.darkgrey,
    zIndex: 2,
  },
  leftRightArrowsContainer: {
    position: "absolute",
    flexDirection: "row",
    width: SIZES.SCREEN_WIDTH * 0.95,
    justifyContent: "space-between",
    zIndex: 10,
  },
  rotatioArrowContainer: {
    zIndex: 10,
    position: "absolute",
  },
  rotationArrowImage: {
    height: SIZES.SCREEN_WIDTH * 0.7,
    aspectRatio: 1,
    opacity: 0.3,
  },
});
