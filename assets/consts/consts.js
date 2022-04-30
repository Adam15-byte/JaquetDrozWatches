import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  golden: "#FCC873",
  black: "#030303",
  white: "#FFFFFF",
  darkgrey: "#282626",
};
export const FONTS = {
  h1: { fontSize: 24, fontWeight: "800" },
  h2: { fontSize: 18, fontWeight: "700" },
  h3: { fontSize: 16, fontWeight: "700" },
  h4: { fontSize: 14, fontWeight: "500" },
  h5: { fontSize: 12, fontWeight: "500" },
};

export const SIZES = {
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
};
