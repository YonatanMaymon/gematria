import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [loaded] = useFonts({
    ShofarDemiBold: require("../assets/fonts/ShofarDemiBold.ttf"),
    ShofarRegular: require("../assets/fonts/ShofarRegular.ttf"),
    StamAshkenazCLM: require("../assets/fonts/StamAshkenazCLM.ttf"),
    StamSefaradCLM: require("../assets/fonts/StamSefaradCLM.ttf"),
  });

  return <Stack screenOptions={{ headerShown: false }} />;
}
