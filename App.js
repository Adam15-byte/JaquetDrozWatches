import "react-native-gesture-handler";
import react, { useState, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "./assets/consts/consts";
import LaunchScreen from "./src/screens/LaunchScreen";
import BrowseScreen from "./src/screens/BrowseScreen";
import BagScreen from "./src/screens/BagScreen";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./src/features/store";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
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
        {currentScreen === 2 && <BrowseScreen changeScreen={changeScreen} />}
        {currentScreen === 3 && <BagScreen changeScreen={changeScreen} />}
      </View>
      <StatusBar style="light" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.SCREEN_WIDTH,
    backgroundColor: COLORS.black,
    minHeight: SIZES.SCREEN_HEIGHT,
    height: SIZES.SCREEN_HEIGHT,
    flexGrow: 1,
  },
});
