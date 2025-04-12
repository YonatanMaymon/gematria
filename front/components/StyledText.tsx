import { COLORS } from "@/constants/Colors";
import React from "react";
import { Text, TextProps, StyleSheet, TextStyle } from "react-native";

type Variant = "title" | "subtitle" | "body";

interface StyledTextProps extends TextProps {
  children: React.ReactNode;
  variant?: Variant;
  style?: TextStyle | TextStyle[];
}

export default function StyledText({
  children,
  variant = "body",
  style,
  ...props
}: StyledTextProps) {
  return (
    <Text style={[styles[variant], styles.text, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "stamashkenazclmWebfont",
    color: COLORS.gold,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,
  },
  title: {
    fontSize: 54,
  },
  subtitle: {
    fontSize: 35,
  },
  body: {
    fontSize: 22,
  },
});
