import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../../assets/consts/consts";
import Animated, {
  scrollTo,
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import RectGreyButton from "../components/RectGreyButton";
import { watches } from "../../assets/data/WatchesData";
import WatchOnBrowseScreen from "../components/WatchOnBrowseScreen";
import { Feather } from "@expo/vector-icons";

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
      <View style={styles.flatListContainer}>
        <FlatList
          data={watches}
          renderItem={({ item, index }) => (
            <WatchOnBrowseScreen item={item} index={index} />
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
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  circleBackgroundForPhone: {
    position: "absolute",
    height: SIZES.SCREEN_HEIGHT * 0.3,
    borderRadius: (SIZES.SCREEN_HEIGHT * 0.3) / 2,
    aspectRatio: 1,
    backgroundColor: COLORS.darkgrey,
    zIndex: 1,
  },
  leftRightArrowsContainer: {
    position: "absolute",
    flexDirection: "row",
    width: SIZES.SCREEN_WIDTH * 0.95,
    justifyContent: "space-between",
    zIndex: 10,
  },
});
