import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../assets/consts/consts";

const WatchOnBrowseScreen = ({ item, index }) => {
  return (
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={item.image[0]} resizeMode="contain" />
    </View>
  );
};

export default WatchOnBrowseScreen;

const styles = StyleSheet.create({
  imageContainer: {
    width: SIZES.SCREEN_WIDTH,
    height: SIZES.SCREEN_HEIGHT * 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: SIZES.SCREEN_HEIGHT * 0.3,
    transform: [{ rotate: "-45deg" }],
    shadowColor: COLORS.black,
    shadowOffset: { height: 15, width: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 25,
  },
});
