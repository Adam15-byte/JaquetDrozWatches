import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, SIZES, FONTS } from "../../assets/consts/consts";

const WatchInShoppingBag = ({
  id,
  collection,
  watchname,
  price,
  image,
  size,
  quantity,
}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.watchimage} resizeMode="contain" />
      <View style={styles.greycontainer}>
        <View style={styles.textsContainer}>
          <Text style={styles.watchnameText}>{watchname}</Text>
          <View style={styles.sizePriceContainer}>
            <Text style={styles.dataText}>Size: {size}</Text>
            <Text style={styles.dataText}>$ {price}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WatchInShoppingBag;

const styles = StyleSheet.create({
  container: {
    width: SIZES.SCREEN_WIDTH * 0.8,
    height: 100,
    justifyContent: "center",
    marginBottom: 20,
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
    width: SIZES.SCREEN_WIDTH * 0.8 - 120,
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
});
