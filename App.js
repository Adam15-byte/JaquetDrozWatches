import "react-native-gesture-handler";
import react, { useState, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "./assets/consts/consts";
import LaunchScreen from "./src/screens/LaunchScreen";
import BrowseScreen from "./src/screens/BrowseScreen";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./store";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(2);
  const changeScreen = useCallback(
    (screen) => {
      setCurrentScreen((prevState) => screen);
    },
    [currentScreen]
  );
  return (
    <Provider store={store}>
      <View style={styles.container}>
        {currentScreen === 1 && <LaunchScreen changeScreen={changeScreen} />}
        {currentScreen === 2 && <BrowseScreen />}
        <StatusBar style="light" />
      </View>
    </Provider>
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
