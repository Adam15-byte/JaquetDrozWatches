import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { COLORS, FONTS, SIZES } from "../../assets/consts/consts";
import Animated, {
  runOnJS,
  scrollTo,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import RectGreyButton from "../components/RectGreyButton";
import { watches } from "../../assets/data/WatchesData";
import WatchOnBrowseScreen from "../components/WatchOnBrowseScreen";
import { Feather } from "@expo/vector-icons";
import { PanGestureHandler } from "react-native-gesture-handler";
import IconsContainer from "../components/IconsContainer";
import { FlatList } from "react-native-gesture-handler";
import ZoomView from "../components/ZoomView";
import ColorsSizePicker from "../components/ColorsSizePicker";

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

  // Gesture Handler for zooming
  const [zoomViewVisible, setZoomViewVisible] = useState(false);
  const changeZoomViewVisibility = useCallback(() => {
    setZoomViewVisible((prevState) => !prevState);
    console.log("initiated");
  }, [zoomViewVisible]);
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const zoomGesture = useAnimatedGestureHandler({
    onStart: (event) => {
      positionX.value = event.absoluteX;
      positionY.value = event.absoluteY;
      runOnJS(changeZoomViewVisibility)();
    },
    onActive: (event) => {
      positionX.value = Math.max(
        Math.min(event.absoluteX, SIZES.SCREEN_WIDTH * 0.7),
        SIZES.SCREEN_WIDTH * 0.3
      );
      positionY.value = Math.max(
        Math.min(event.absoluteY, SIZES.SCREEN_HEIGHT * 0.65),
        SIZES.SCREEN_HEIGHT * 0.3
      );
    },
    onEnd: () => {
      runOnJS(changeZoomViewVisibility)();
    },
  });

  // Get the index of the current item
  const [currentItem, setCurrentItem] = useState(0);
  const onViewChangeRef = useRef(({ viewableItems }) => {
    setCurrentItem((prevState) => viewableItems[0].index);
  });
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
      <ZoomView
        zoomViewVisible={zoomViewVisible}
        positionX={positionX}
        positionY={positionY}
        rotateX={rotateX}
        rotateY={rotateY}
        currentItem={currentItem}
      />
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
          onViewableItemsChanged={onViewChangeRef.current}
        />
        <View style={styles.circleBackgroundForPhone} />
        {/* 
        When Rotation is enabled show View with PanGestureHadnler to read the touch data for rotation */}
        {currentViewingMode === 1 && (
          <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View
              style={[styles.rotatioArrowContainer, animatedRotatingStyle]}
              entering={FadeIn}
              exiting={FadeOut}
            >
              <Image
                source={require("../../assets/images/RotateArrow.png")}
                style={styles.rotationArrowImage}
              />
            </Animated.View>
          </PanGestureHandler>
        )}

        {/* When Zoom is enabled, display a screen similar to the one with arrow, to maintain slight overlay on watches */}
        {currentViewingMode === 2 && (
          <Animated.View
            style={styles.rotatioArrowContainer}
            entering={FadeIn}
            exiting={FadeOut}
          >
            <Image
              source={require("../../assets/images/RotateCircle.png")}
              style={styles.rotationArrowImage}
            />
          </Animated.View>
        )}

        {/* Transparent block in front of watch displayed to read the data from PanGestureHandler */}
        {currentViewingMode === 2 && (
          <PanGestureHandler onGestureEvent={zoomGesture}>
            <Animated.View
              style={styles.zoomGestureView}
              entering={FadeIn}
              exiting={FadeOut}
            />
          </PanGestureHandler>
        )}

        <View style={styles.leftRightArrowsContainer}>
          <TouchableOpacity onPress={() => scrollPrevious()}>
            <Feather name="chevron-left" size={42} color={COLORS.golden} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => scrollNext()}>
            <Feather name="chevron-right" size={42} color={COLORS.golden} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.watchName} numberOfLines={2}>
          {watches[currentItem].watchname[0].toUpperCase()}
        </Text>
        <Text style={styles.seriesName}>
          {watches[currentItem].collection.toUpperCase()}
        </Text>
      </View>
      <ColorsSizePicker currentItem={currentItem} />
      <View style={styles.buyButtonPriceContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceTag}>$ {watches[currentItem].price}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Order Online</Text>
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
    zIndex: 12,
    position: "absolute",
  },
  rotationArrowImage: {
    height: SIZES.SCREEN_WIDTH * 0.7,
    aspectRatio: 1,
    opacity: 0.3,
  },
  zoomGestureView: {
    width: SIZES.SCREEN_WIDTH * 0.6,
    height: SIZES.SCREEN_HEIGHT * 0.4,
    zIndex: 12,
    position: "absolute",
  },
  nameContainer: {
    width: SIZES.SCREEN_WIDTH * 0.8,
    height: 60,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: -40,
  },
  watchName: {
    color: COLORS.white,
    ...FONTS.h3,
  },
  seriesName: {
    color: COLORS.white,
    ...FONTS.h4,
    marginTop: 5,
  },
  buyButtonPriceContainer: {
    flexDirection: "row",
    height: 70,
    width: SIZES.SCREEN_WIDTH * 0.8,
    marginTop: 20,
    backgroundColor: COLORS.darkgrey,
    borderRadius: 30,
  },
  priceContainer: {
    height: "100%",
    width: SIZES.SCREEN_WIDTH * 0.3,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    height: "100%",
    width: SIZES.SCREEN_WIDTH * 0.5,
    backgroundColor: COLORS.golden,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  priceTag: {
    ...FONTS.h3,
    color: COLORS.white,
  },
  buttonText: {
    color: COLORS.black,
    ...FONTS.h3,
  },
});
