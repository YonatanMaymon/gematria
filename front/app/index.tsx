import StyledText from "@/components/StyledText";
import StyledTextInput from "@/components/StyledTextInput";
import { COLORS } from "@/constants/Colors";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
} from "react-native";

export default function Index() {
  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={styles.container}
    >
      <View style={styles.overlay} />
      <StyledText variant="title">גימטריה</StyledText>
      <StyledText variant="body">הכנס משפט וצפה בדבר השם</StyledText>
      <StyledTextInput />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderWidth: 10,
    borderColor: COLORS.gold,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Makes it fill the entire parent
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
});
