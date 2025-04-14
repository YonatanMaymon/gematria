import { COLORS } from "@/constants/Colors";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  const [loaded] = useFonts({
    ShofarDemiBold: require("../assets/fonts/ShofarDemiBold.ttf"),
    ShofarRegular: require("../assets/fonts/ShofarRegular.ttf"),
    StamAshkenazCLM: require("../assets/fonts/StamAshkenazCLM.ttf"),
    StamSefaradCLM: require("../assets/fonts/StamSefaradCLM.ttf"),
  });

  return (
    // <SQLiteProvider
    //   databaseName="hebrew_words.db"
    //   assetSource={{ assetId: require("../assets/hebrew_words.db") }}
    // >
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarBackgroundColor: COLORS.gold,
      }}
    />
    // </SQLiteProvider>
  );
}
