import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";

export function RabbiShake() {
  const rotationAnimation = useSharedValue(0);

  useEffect(() => {
    rotationAnimation.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 300 }),
        withTiming(25, { duration: 500 }),
        withTiming(0, { duration: 500 })
      ),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
    width: 100,
    height: 100,
  }));

  return (
    <Animated.Image
      style={animatedStyle}
      source={require("../assets/images/rabbi.png")}
    />
  );
}
