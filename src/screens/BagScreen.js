import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { COLORS, FONTS, SIZES } from "../../assets/consts/consts";
import { useSelector, useDispatch } from "react-redux";
import RectGreyButton from "../components/RectGreyButton";
import WatchInShoppingBag from "../components/WatchInShoppingBag";
import CreditCard from "../components/CreditCard";
import PaymentMethodPicker from "../components/PaymentMethodPicker";
import PaypalPayment from "../components/PaypalPayment";
import ConfirmationButton from "../components/ConfirmationButton";

const BagScreen = ({ changeScreen }) => {
  const shoppingBag = useSelector((state) => state.shoppingBag);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setTotalPrice((prevState) => 0);
    {
      shoppingBag.map((item) => {
        setTotalPrice((prevState) => prevState + item.price);
      });
    }
  }, [shoppingBag]);

  ////
  // State to keep track of current payment method chosen
  ////
  const [paymentMethodChosen, setPaymentMethodChosen] = useState("Card");
  const changePaymentMethodChosen = useCallback(
    (input) => {
      setPaymentMethodChosen((prevState) => input);
    },
    [paymentMethodChosen]
  );
  ////
  // flexGrow in contentContainerStyle didn't work
  // function to calculate height for ScrollView
  ////
  const minimumHeight = Math.max(
    SIZES.SCREEN_HEIGHT,
    shoppingBag.length * 120 + 800
  );
  return (
    <ScrollView
      style={styles.scrollViewContainer}
      keyboardDismissMode="on-drag"
      contentContainerStyle={{
        minHeight: minimumHeight,
      }}
      showsVerticalScrollIndicator={true}
      bounces={false}
    >
      <View style={styles.container}>
        {/* Top Bar */}
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

        {/* Watches insides shopping bag */}
        <View style={styles.watchesListContainer}>
          {shoppingBag.length === 0 ? (
            <View style={styles.noItemsContainer}>
              <Text style={styles.noItemsText}>No items in bag</Text>
            </View>
          ) : (
            shoppingBag.map((item) => {
              const {
                id,
                collection,
                watchname,
                price,
                image,
                size,
                quantity,
              } = item;
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

        {/* Purchase Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.itemsSummary}>
            <Text style={styles.leftText}>Number</Text>
            <View style={styles.rightTextContainer}>
              {shoppingBag.length === 1 && (
                <Text style={styles.rightText}>{shoppingBag.length} Item</Text>
              )}
              {shoppingBag.length !== 1 && (
                <Text style={styles.rightText}>{shoppingBag.length} Items</Text>
              )}
            </View>
          </View>
          <View style={styles.totalPriceSummary}>
            <Text style={styles.leftText}>Total Price</Text>
            <View style={styles.rightTextContainer}>
              <Text style={styles.rightText}>$ {totalPrice}</Text>
            </View>
          </View>
          {paymentMethodChosen === "Card" && <CreditCard />}
          {paymentMethodChosen === "Paypal" && <PaypalPayment />}
          <View style={styles.paymentMethodPicker}>
            <Text style={styles.paymentMethod}>Payment Method</Text>
            <PaymentMethodPicker
              changePaymentMethodChosen={changePaymentMethodChosen}
              paymentMethodChosen={paymentMethodChosen}
            />
          </View>
          <ConfirmationButton />
        </View>
      </View>
    </ScrollView>
  );
};

export default BagScreen;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 500,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    width: SIZES.SCREEN_WIDTH,
    minHeight: SIZES.SCREEN_HEIGHT,
    height: "auto",
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
  summaryContainer: {
    width: SIZES.SCREEN_WIDTH * 0.8,
    height: 100,
    marginTop: 20,
  },
  itemsSummary: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    width: "100%",
  },
  totalPriceSummary: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  leftText: {
    color: COLORS.white,
    opacity: 0.6,
    textAlign: "left",
    ...FONTS.h3,
  },
  rightText: {
    color: COLORS.white,
    textAlign: "left",
    ...FONTS.h3,
  },
  rightTextContainer: {
    width: "25%",
    height: "100%",
    alignItems: "flex-start",
  },
  paymentMethod: {
    color: COLORS.white,
    ...FONTS.h3,
    marginBottom: 10,
  },
  paymentMethodPicker: {
    marginVertical: 5,
    marginBottom: 25,
  },
});
