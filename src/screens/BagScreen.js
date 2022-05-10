import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../../assets/consts/consts";
import { useSelector, useDispatch } from "react-redux";
import RectGreyButton from "../components/RectGreyButton";
import WatchInShoppingBag from "../components/WatchInShoppingBag";

const BagScreen = ({ changeScreen }) => {
  const shoppingBag = useSelector((state) => state.shoppingBag);

  return (
    <View style={styles.container}>
      <View style={styles.topBarContainer}>
        <RectGreyButton
          onPress={() => changeScreen(2)}
          isShoppingBag={false}
          featherIconName="chevron-left"
        />
        <View style={styles.paymentTitles}>
          <Text style={styles.paymentTitleText}>Payment</Text>
          <Text style={styles.paymentSubtitleText}>Convenient Payment</Text>
        </View>
        <RectGreyButton
          onPress={() => console.log("options pressed")}
          isShoppingBag={false}
          featherIconName="more-horizontal"
        />
      </View>
      <View style={styles.watchesListContainer}>
        {shoppingBag.length === 0 ? (
          <View style={styles.noItemsContainer}>
            <Text style={styles.noItemsText}>No items in bag</Text>
          </View>
        ) : (
          shoppingBag.map((item, index) => {
            const { id, collection, watchname, price, image, size, quantity } =
              item;
            return (
              <WatchInShoppingBag
                key={id}
                id={id}
                collection={collection}
                watchname={watchname}
                price={price}
                image={image}
                size={size}
                quantity={quantity}
              />
            );
          })
        )}
      </View>
    </View>
  );
};

export default BagScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.SCREEN_WIDTH,
    paddingTop: 70,
    paddingBottom: 50,
    alignItems: "center",
  },
  topBarContainer: {
    width: SIZES.SCREEN_WIDTH * 0.8,
    maxHeight: 70,
    flexDirection: "row",
  },
  paymentTitles: {
    marginLeft: 15,
    marginRight: "auto",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  paymentTitleText: {
    ...FONTS.h2,
    color: COLORS.white,
  },
  paymentSubtitleText: {
    ...FONTS.h4,
    color: COLORS.white,
  },
  watchesListContainer: {
    width: SIZES.SCREEN_WIDTH * 0.8,
    marginTop: 30,
  },
  noItemsContainer: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  noItemsText: {
    color: COLORS.white,
    ...FONTS.h2,
  },
});
