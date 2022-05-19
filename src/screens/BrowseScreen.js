import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { COLORS, FONTS, SIZES } from "../../assets/consts/consts";
import Animated, {
  runOnJS,
  scrollTo,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  FadeIn,
  FadeOut,
  withTiming,
  withDelay,
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
import { useDispatch, useSelector } from "react-redux";
import {
  setNewWatch,
  setNewColor,
  setIsLoadingNewWatch,
} from "../features/watchDisplayedSlice";
import { addToBag } from "../features/shoppingBag";

const BrowseScreen = ({ changeScreen, currentScreen }) => {
  ////
  // values for opacity of elements, used when screens are changed
  // either appearing on load or disappearing when moving to another screen
  ////
  const topPartOpacity = useSharedValue(0);
  const middlePartOpacity = useSharedValue(0);
  const bottomPartOpacity = useSharedValue(0);

  useEffect(() => {
    if (currentScreen === 2) {
      topPartOpacity.value = withTiming(1);
      middlePartOpacity.value = withDelay(300, withTiming(1));
      bottomPartOpacity.value = withDelay(600, withTiming(1));
    }
  }, [currentScreen]);

  const topAnimatedOpacity = useAnimatedStyle(() => {
    return { opacity: topPartOpacity.value };
  });
  const middleAnimatedOpacity = useAnimatedStyle(() => {
    return { opacity: middlePartOpacity.value };
  });
  const bottomAnimatedOpacity = useAnimatedStyle(() => {
    return { opacity: bottomPartOpacity.value };
  });

  const moveToNextScreen = () => {
    topPartOpacity.value = withTiming(0);
    middlePartOpacity.value = withDelay(300, withTiming(0));
    bottomPartOpacity.value = withDelay(600, withTiming(0));
    const delayedChange = () => {
      setTimeout(changeScreen, 600, 3);
    };
    delayedChange();
    clearTimeout(delayedChange());
  };

  ////
  // Ref and Value used to swipe left and right on the screen
  ////
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
  ////
  // Values and hooks to handle images rotation on press
  ////
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const rotateXarrow = useSharedValue(0);
  const rotateYarrow = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.x = rotateX.value;
      context.y = rotateY.value;
    },
    onActive: (event, context) => {
      rotateX.value = event.translationX + context.x;
      rotateY.value = event.translationY + context.y;
      rotateXarrow.value = event.translationX;
      rotateYarrow.value = event.translationY;
    },
    onEnd: () => {
      rotateXarrow.value = withTiming(0);
      rotateYarrow.value = withTiming(0);
    },
  });
  const animatedRotatingStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: (rotateXarrow.value + rotateYarrow.value) / 200 }],
    };
  });

  ////
  // state for keeping track of rotation mode or zoom mode
  ////
  const [currentViewingMode, setCurrentViewingMode] = useState(1);
  const changeCurrentViewingMode = useCallback(
    (newState) => {
      setCurrentViewingMode((prevState) => newState);
    },
    [currentViewingMode]
  );

  ////
  // Gesture Handler for zooming
  ////
  const [zoomViewVisible, setZoomViewVisible] = useState(false);
  const changeZoomViewVisibility = useCallback(() => {
    setZoomViewVisible((prevState) => !prevState);
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
  ////
  // Get the index of the current watch, state of isLoading
  ////
  const currentWatch = useSelector(
    (state) => state.watchDisplayed.collectionNumber
  );
  const isLoading = useSelector(
    (state) => state.watchDisplayed.isLoadingNewWatch
  );
  const currentSize = useSelector((state) => state.watchDisplayed.sizeSelected);
  const currentColor = useSelector((state) => state.watchDisplayed.colorIndex);
  const dispatch = useDispatch();
  const [currentItem, setCurrentItem] = useState(0);
  // ref function that reads the current item
  const onViewChangeRef = useRef(({ viewableItems }) => {
    setCurrentItem((prevState) => viewableItems[0].index);
  });

  useEffect(() => {
    dispatch(setNewWatch(currentItem));
  }, [currentItem]);

  ////
  // Create an object in the background every time the currentWatch or currentColor is changed
  // This object is what will get passed to shopping bag reducer action addToBag
  ////
  const shoppingBag = useSelector((state) => state.shoppingBag);
  const [watchObjectForBag, setWatchObjectForBag] = useState({});
  useEffect(() => {
    setWatchObjectForBag((prevState) => ({
      id: shoppingBag.length + Math.random(),
      collection: watches[currentWatch].collection,
      watchname: watches[currentWatch].watchname[currentColor],
      price: watches[currentWatch].price,
      image: watches[currentWatch].image[currentColor],
      size: currentSize,
      quantity: 1,
    }));
  }, [currentWatch, currentColor, shoppingBag, currentSize]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.topBarContainer, topAnimatedOpacity]}>
        <View style={styles.topTexts}>
          <Text style={styles.headerText}>Online Store</Text>
          <Text style={styles.subheaderText}>Easy Shopping</Text>
        </View>
        <RectGreyButton
          featherIconName="shopping-cart"
          onPress={() => {
            moveToNextScreen();
          }}
          isShoppingBag={true}
        />
      </Animated.View>

      {/* Icons to change between rotation and zooming */}
      <IconsContainer
        currentViewingMode={currentViewingMode}
        changeCurrentViewingMode={changeCurrentViewingMode}
        topAnimatedOpacity={topAnimatedOpacity}
      />

      {/* FlatList Displaying the watches in the center */}
      <ZoomView
        zoomViewVisible={zoomViewVisible}
        positionX={positionX}
        positionY={positionY}
        rotateX={rotateX}
        rotateY={rotateY}
      />
      <Animated.View style={[styles.flatListContainer, middleAnimatedOpacity]}>
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
                source={require("../../assets/images/RotateArrow1.png")}
                style={styles.rotationArrowImage}
              />
            </Animated.View>
          </PanGestureHandler>
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
          <TouchableOpacity
            onPress={() => {
              scrollPrevious();
              if (currentWatch > 0 && currentWatch < 3) {
                dispatch(setIsLoadingNewWatch(true));
              }
            }}
          >
            <View style={styles.singleArrowContainer}>
              <Feather name="chevron-left" size={42} color={COLORS.golden} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              scrollNext();
              if (currentWatch > 0 && currentWatch < 3) {
                dispatch(setIsLoadingNewWatch(true));
              }
            }}
          >
            <View style={styles.singleArrowContainer}>
              <Feather name="chevron-right" size={42} color={COLORS.golden} />
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.View style={bottomAnimatedOpacity}>
        <View style={styles.nameContainer}>
          <View style={styles.titleContainer}>
            {isLoading ? null : (
              <Text style={styles.watchName} numberOfLines={2}>
                {watches[currentWatch].watchname[currentColor].toUpperCase()}
              </Text>
            )}
          </View>

          <Text style={styles.seriesName}>
            {watches[currentWatch].collection.toUpperCase()}
          </Text>
        </View>
        <ColorsSizePicker />
        <View style={styles.buyButtonPriceContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceTag}>$ {watches[currentWatch].price}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              dispatch(addToBag(watchObjectForBag));
            }}
          >
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Order Online</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
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
    width: SIZES.SCREEN_WIDTH * 0.99,
    justifyContent: "space-between",
    zIndex: 10,
  },
  rotatioArrowContainer: {
    zIndex: 10,
    position: "absolute",
  },
  rotationArrowImage: {
    height: SIZES.SCREEN_WIDTH * 0.8,
    aspectRatio: 1,
    opacity: 0.5,
    transform: [{ rotate: "25deg" }],
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
  singleArrowContainer: {
    padding: 20,
  },
  titleContainer: {
    height: 40,
    width: SIZES.SCREEN_WIDTH * 0.8,
  },
});
