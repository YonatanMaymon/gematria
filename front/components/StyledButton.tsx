import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { COLORS } from "@/constants/Colors"; // Make sure this includes `gold`, `velvet`, etc.
import StyledText from "./StyledText";

interface StyledButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function StyledButton({
  title,
  onPress,
  style,
  textStyle,
}: StyledButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      activeOpacity={0.8}
    >
      <StyledText style={textStyle}>{title}</StyledText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.velvet ?? "#2C003E",
    borderWidth: 2,
    borderColor: COLORS.gold ?? "#D4AF37",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignItems: "center",
    shadowColor: COLORS.gold ?? "#D4AF37",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
});
