import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../assets/consts/consts";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const PaymentMethodPicker = ({
  changePaymentMethodChosen,
  paymentMethodChosen,
}) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => changePaymentMethodChosen("Card")}
      >
        <View
          style={[
            styles.singleImageContainer,
            {
              backgroundColor:
                paymentMethodChosen === "Card" ? COLORS.darkgrey : null,
            },
          ]}
        >
          <Image
            source={require("../../assets/images/Visa.png")}
            resizeMode="contain"
            style={styles.imageStyle}
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => changePaymentMethodChosen("Paypal")}
      >
        <View
          style={[
            styles.singleImageContainer,
            {
              backgroundColor:
                paymentMethodChosen === "Paypal" ? COLORS.darkgrey : null,
            },
          ]}
        >
          <Image
            source={require("../../assets/images/Paypal.png")}
            resizeMode="contain"
            style={styles.imageStyle}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default PaymentMethodPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
    width: SIZES.SCREEN_WIDTH * 0.8,
    justifyContent: "flex-start",
  },
  singleImageContainer: {
    width: SIZES.SCREEN_WIDTH * 0.2,
    aspectRatio: 1,
    borderRadius: 15,
    marginRight: 15,
    padding: 10,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
});
