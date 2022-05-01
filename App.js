import "react-native-gesture-handler";
import react, { useState, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "./assets/consts/consts";
import LaunchScreen from "./src/screens/LaunchScreen";
import BrowseScreen from "./src/screens/BrowseScreen";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(2);
  const changeScreen = useCallback(
    (screen) => {
      setCurrentScreen((prevState) => screen);
    },
    [currentScreen]
  );
  return (
    <View style={styles.container}>
      {currentScreen === 1 && <LaunchScreen changeScreen={changeScreen} />}
      {currentScreen === 2 && <BrowseScreen />}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.SCREEN_WIDTH,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },
});
