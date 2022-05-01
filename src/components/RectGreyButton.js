import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../assets/consts/consts";

const RectGreyButton = ({ featherIconName, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Feather name={featherIconName} size={24} color={COLORS.white} />
    </TouchableOpacity>
  );
};

export default RectGreyButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.darkgrey,
    height: 65,
    width: 65,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
