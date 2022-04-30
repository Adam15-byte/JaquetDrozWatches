import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";
import { COLORS, SIZES, FONTS } from "../../assets/consts/consts";
import { LaunchImages } from "../../assets/data/WatchesData";

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import WatchOnLaunch from "../components/WatchOnLaunch";
import GetStartedButtonSlider from "../components/GetStartedButtonSlider";

const LaunchScreen = () => {
  const translateImageX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateImageX.value = event.contentOffset.x;
  });
  const textOpacity = useSharedValue(1);
  const animatedTextOpacity = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
    };
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.brandTitleContainer, animatedTextOpacity]}>
        <Text style={styles.brandTitleText}>JAQUET DROZ</Text>
      </Animated.View>
      <Animated.View style={[styles.catchphraseContainer, animatedTextOpacity]}>
        <Text style={styles.catchphraseText}>Do Not Waste Time</Text>
      </Animated.View>
      <View style={styles.dotsContainer}>
        {LaunchImages.map((item, index) => {
          const animatedOpacity = useAnimatedStyle(() => {
            const opacity = interpolate(
              translateImageX.value,
              [
                (index - 1) * SIZES.SCREEN_WIDTH,
                index * SIZES.SCREEN_WIDTH,
                (index + 1) * SIZES.SCREEN_WIDTH,
              ],
              [0.3, 1, 0.3],
              Extrapolate.CLAMP
            );
            return { opacity };
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              style={[styles.singleDot, animatedOpacity]}
            />
          );
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
        bounces={false}
        onScroll={scrollHandler}
      />
      <GetStartedButtonSlider textOpacity={textOpacity} />
    </View>
  );
};

export default LaunchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.SCREEN_WIDTH,
    paddingTop: 70,
    paddingBottom: 50,
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
});
