import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "./assets/consts/consts";
import LaunchScreen from "./src/screens/LaunchScreen";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <View style={styles.container}>
      <LaunchScreen />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },
});
