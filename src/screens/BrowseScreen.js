import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../../assets/consts/consts";
import Animated from "react-native-reanimated";
import RectGreyButton from "../components/RectGreyButton";
import { watches } from "../../assets/data/WatchesData";
import WatchOnBrowseScreen from "../components/WatchOnBrowseScreen";

const BrowseScreen = () => {
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
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={16}
          style={{ zIndex: 5 }}
        />
        <View style={styles.circleBackgroundForPhone} />
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
});
