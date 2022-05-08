import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { SIZES, COLORS, FONTS } from "../../assets/consts/consts";
import { watches } from "../../assets/data/WatchesData";
import { watchSizes } from "../../assets/data/WatchesData";
import { useSelector, useDispatch } from "react-redux";
import { setNewColor, setNewSize } from "../features/watchDisplayedSlice";

const ColorsSizePicker = () => {
  const currentWatch = useSelector(
    (state) => state.watchDisplayed.collectionNumber
  );
  const currentColor = useSelector((state) => state.watchDisplayed.colorIndex);
  const currentSize = useSelector((state) => state.watchDisplayed.sizeSelected);
  const dispatch = useDispatch();

  ////
  // on scroll to different collection, the color is reset to 0, in the background it also sets loading state to false
  ////
  useEffect(() => {
    dispatch(setNewColor(0));
  }, [currentWatch]);
  return (
    <View style={styles.colorSizingContainer}>
      <View style={styles.colorPicker}>
        <Text style={styles.headerText}>Color</Text>
        <View style={styles.colorsDisplayBar}>
          {watches[currentWatch].color.map((color, index) => (
            ////
            // On press set new color in redux state
            ////
            <TouchableOpacity
              onPress={() => dispatch(setNewColor(index))}
              key={`color-${index}`}
            >
              <View
                style={[
                  styles.dotBackgroundBorder,
                  {
                    borderColor: index === currentColor ? COLORS.white : null,
                  },
                ]}
              >
                <View
                  key={`color-${index}`}
                  style={[styles.colorDot, { backgroundColor: color }]}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.sizePicker}>
        <Text style={styles.headerText}>Sizing</Text>
        <View style={styles.sizesDisplayBar}>
          {watchSizes.map((size, index) => (
            <TouchableWithoutFeedback
              key={`size-${index}`}
              onPress={() => dispatch(setNewSize(size))}
            >
              <View style={styles.sizeNumberContainer}>
                <Text
                  style={[
                    styles.sizesTexts,
                    { opacity: size === currentSize ? 1 : 0.4 },
                  ]}
                >
                  {size}
                </Text>
              </View>
            </TouchableWithoutFeedback>
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
  sizeNumberContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
});
