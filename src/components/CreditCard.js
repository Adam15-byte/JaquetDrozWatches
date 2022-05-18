import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { SIZES, COLOS, FONTS, COLORS } from "../../assets/consts/consts";

const CreditCard = () => {
  ////
  // refs to identify fields of numbers from TextInputs
  ////
  const firstDigits = useRef();
  const secondDigits = useRef();
  const thirdDigits = useRef();
  const fourthDigits = useRef();
  const cvcDigits = useRef();

  ////
  // state to hold information from TextInputs
  ////
  const [name, setName] = useState("");
  const [firstCardNumber, setFirstFourCardNumber] = useState("");
  const [secondCardNumber, setSecondFourCardNumber] = useState("");
  const [thirdCardNumber, setThirdFourCardNumber] = useState("");
  const [fourthCardNumber, setFourthFourCardNumber] = useState("");
  const [cvc, setCvc] = useState("");

  ////
  // on change of state, if on window reaches its maximum capacity, automatically transfer to next window
  ////
  useEffect(() => {
    if (firstCardNumber.length === 4 && secondCardNumber.length === 0) {
      secondDigits.current.focus();
    }
    if (secondCardNumber.length === 4 && thirdCardNumber.length === 0) {
      thirdDigits.current.focus();
    }
    if (thirdCardNumber.length === 4 && fourthCardNumber.length === 0) {
      fourthDigits.current.focus();
    }
    if (fourthCardNumber.length === 4 && cvc.length === 0) {
      cvcDigits.current.focus();
    }
  }, [firstCardNumber, secondCardNumber, thirdCardNumber, fourthCardNumber]);
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={require("../../assets/images/CreditCard.png")}
        style={styles.imageBackground}
      >
        {/* Full Name Input */}
        <View style={styles.nameContainer}>
          <Text style={styles.nameIdentifier}>Name</Text>
          <View style={styles.nameInputContainer}>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={(text) => setName(text)}
              value={name}
            />
            <View style={styles.whiteUnderline} />
          </View>
        </View>

        {/* Card Number Input */}
        <View style={styles.cardNumberContainer}>
          <View style={styles.fourDigitContainer}>
            <TextInput
              secureTextEntry
              style={styles.cardSingleInput}
              maxLength={4}
              keyboardType="numeric"
              onChangeText={(text) => setFirstFourCardNumber(text)}
              value={firstCardNumber}
              ref={firstDigits}
            />
            <View style={styles.whiteUnderline} />
          </View>
          <View style={styles.fourDigitContainer}>
            <TextInput
              secureTextEntry
              style={styles.cardSingleInput}
              maxLength={4}
              keyboardType="numeric"
              onChangeText={(text) => setSecondFourCardNumber(text)}
              value={secondCardNumber}
              ref={secondDigits}
            />
            <View style={styles.whiteUnderline} />
          </View>
          <View style={styles.fourDigitContainer}>
            <TextInput
              secureTextEntry
              style={styles.cardSingleInput}
              maxLength={4}
              keyboardType="numeric"
              onChangeText={(text) => setThirdFourCardNumber(text)}
              value={thirdCardNumber}
              ref={thirdDigits}
            />
            <View style={styles.whiteUnderline} />
          </View>
          <View style={styles.fourDigitContainer}>
            <TextInput
              style={styles.cardSingleInput}
              maxLength={4}
              keyboardType="numeric"
              onChangeText={(text) => setFourthFourCardNumber(text)}
              value={fourthCardNumber}
              ref={fourthDigits}
            />
            <View style={styles.whiteUnderline} />
          </View>
        </View>
        {/* 
        CVC container */}
        <View style={styles.cvcContainer}>
          <Text style={styles.cvcTitle}>cvc</Text>
          <View style={styles.cvcInputContainer}>
            <TextInput
              style={styles.cvcInputStyle}
              maxLength={3}
              secureTextEntry
              keyboardType="numeric"
              onChangeText={(text) => setCvc(text)}
              value={cvc}
              ref={cvcDigits}
            />
            <View style={styles.whiteUnderline} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CreditCard;

const styles = StyleSheet.create({
  container: {
    width: SIZES.SCREEN_WIDTH * 0.8,
    height: SIZES.SCREEN_HEIGHT * 0.25,
    marginVertical: 15,
    paddingRight: 15,
  },
  imageBackground: {
    width: SIZES.SCREEN_WIDTH * 0.8,
    height: "100%",
    paddingRight: 15,
    alignItems: "flex-end",
  },
  nameContainer: {
    marginTop: SIZES.SCREEN_HEIGHT * 0.08,
    width: SIZES.SCREEN_WIDTH * 0.5,
    height: 25,
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: "auto",
    flexDirection: "row",
  },
  nameInputContainer: {
    width: SIZES.SCREEN_WIDTH * 0.3,
  },
  textInputStyle: {
    width: SIZES.SCREEN_WIDTH * 0.3,
    color: COLORS.white,
  },
  whiteUnderline: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.white,
    width: "100%",
  },
  nameIdentifier: {
    color: COLORS.white,
    marginRight: 10,
  },
  cardNumberContainer: {
    marginTop: SIZES.SCREEN_HEIGHT * 0.04,
    width: "90%",
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
  },
  cardSingleInput: {
    width: "100%",
    color: COLORS.white,
  },
  fourDigitContainer: {
    width: SIZES.SCREEN_WIDTH * 0.15,
    marginHorizontal: 5,
    padding: "auto",
  },
  cvcContainer: {
    marginTop: SIZES.SCREEN_HEIGHT * 0.01,
    width: "40%",
    height: 25,
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    marginLeft: "auto",
  },
  cvcTitle: {
    color: COLORS.white,
    marginRight: 10,
  },
  cvcInputContainer: {
    width: SIZES.SCREEN_WIDTH * 0.15,
  },
  cvcInputStyle: {
    color: COLORS.white,
    width: "100%",
  },
});
