import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SIZES, COLORS, FONTS } from "../../assets/consts/consts";
import { watches } from "../../assets/data/WatchesData";
import { watchSizes } from "../../assets/data/WatchesData";

const ColorsSizePicker = ({
  currentItem,
  selectedSize = 41,
  selectedColor = 0,
}) => {
  return (
    <View style={styles.colorSizingContainer}>
      <View style={styles.colorPicker}>
        <Text style={styles.headerText}>Color</Text>
        <View style={styles.colorsDisplayBar}>
          {watches[currentItem].color.map((color, index) => (
            <View
              key={`color-${index}`}
              style={[
                styles.dotBackgroundBorder,
                {
                  borderColor: index === selectedColor ? COLORS.white : null,
                },
              ]}
            >
              <View
                key={`color-${index}`}
                style={[styles.colorDot, { backgroundColor: color }]}
              />
            </View>
          ))}
        </View>
      </View>
      <View style={styles.sizePicker}>
        <Text style={styles.headerText}>Sizing</Text>
        <View style={styles.sizesDisplayBar}>
          {watchSizes.map((size, index) => (
            <Text
              key={`size-${index}`}
              style={[
                styles.sizesTexts,
                { opacity: size === selectedSize ? 1 : 0.4 },
              ]}
            >
              {size}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ColorsSizePicker;

const styles = StyleSheet.create({
  colorSizingContainer: {
    flexDirection: "row",
    width: SIZES.SCREEN_WIDTH * 0.8,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  colorPicker: {
    width: SIZES.SCREEN_WIDTH * 0.4,
    alignItems: "flex-start",
    height: "100%",
    justifyContent: "space-between",
  },
  sizePicker: {
    width: SIZES.SCREEN_WIDTH * 0.4,
    alignItems: "flex-start",
    height: "100%",
    justifyContent: "space-between",
  },
  colorsDisplayBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "50%",
  },
  sizesDisplayBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "50%",
  },
  headerText: {
    color: COLORS.white,
    ...FONTS.h5,
  },
  sizesTexts: {
    ...FONTS.h5,
    color: COLORS.white,
  },
  colorDot: {
    height: 16,
    width: 16,
    borderRadius: 7,
  },
  dotBackgroundBorder: {
    height: 24,
    width: 24,
    borderRadius: 12,
    marginRight: 14,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
