import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";
import { COLORS, SIZES, FONTS } from "../../assets/consts/consts";
import { LaunchImages } from "../../assets/data/WatchesData";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import WatchOnLaunch from "../components/WatchOnLaunch";

const LaunchScreen = () => {
  const translateImageX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateImageX.value = event.contentOffset.x;
    console.log(event.contentOffset.x);
  });
  const newArrayOfFour = new Array(4).fill(0);
  return (
    <View style={styles.container}>
      <View style={styles.brandTitleContainer}>
        <Text style={styles.brandTitleText}>JAQUET DROZ</Text>
      </View>
      <View style={styles.catchphraseContainer}>
        <Text style={styles.catchphraseText}>Do Not Waste Time</Text>
      </View>
      <View style={styles.dotsContainer}>
        {LaunchImages.map((item, index) => {
          return <View key={`dot-${index}`} style={styles.singleDot} />;
        })}
      </View>
      <Animated.FlatList
        data={LaunchImages}
        renderItem={({ item, index }) => (
          <WatchOnLaunch
            item={item}
            index={index}
            translateX={translateImageX}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={16}
        keyExtractor={(_, index) => index}
        onScroll={scrollHandler}
      />

      <View style={styles.sliderContainer}>
        <View style={styles.getStartedButton}>
          <Text style={styles.getStartedText}>Get Started</Text>
        </View>
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
    </View>
  );
};

export default LaunchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.SCREEN_WIDTH,
    paddingTop: 70,
    paddingBottom: 40,
  },

  brandTitleContainer: {
    marginLeft: 30,
  },
  brandTitleText: {
    color: COLORS.white,
    ...FONTS.h1,
  },
  catchphraseContainer: {
    marginLeft: 30,
    marginTop: 10,
  },
  catchphraseText: {
    color: COLORS.white,
    ...FONTS.h4,
  },
  dotsContainer: {
    marginTop: 20,
    width: 60,
    flexDirection: "row",
    marginLeft: 30,
    justifyContent: "space-between",
  },
  singleDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.white,
  },
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
  },
});
