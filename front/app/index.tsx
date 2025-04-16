import { RabbiShake } from "@/components/RabbiShake";
import StyledButton from "@/components/StyledButton";
import StyledText from "@/components/StyledText";
import StyledTextInput from "@/components/StyledTextInput";
import { COLORS } from "@/constants/Colors";
import { getGematriaValue, Word } from "@/functions/GemtariaUtil";
import { useGematriaSearch } from "@/hooks/DBSearcher";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Keyboard,
  FlatList,
} from "react-native";

export default function Index() {
  const [text, setText] = useState("");
  const { results, loading, error, search } = useGematriaSearch();
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  useEffect(() => {
    if (results.length > 0) {
      setSelectedWord(results[Math.round(Math.random() * results.length)]);
    } else if (selectedWord != null)
      setSelectedWord({
        id: -1,
        word: "לא מוצא :(",
        gematria_value: 0,
        type: "",
      });
  }, [results]);

  const handlePress = () => {
    Keyboard.dismiss();
    const GematriaValue = getGematriaValue(text);
    search(GematriaValue);
  };
  // Render each word item from the search results.
  const renderItem = ({ item }: { item: Word }): JSX.Element => (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <StyledText style={{ fontSize: 18 }}>Word: {item.word}</StyledText>
      <StyledText>Gematria: {item.gematria_value}</StyledText>
      <StyledText>Type: {item.type}</StyledText>
    </View>
  );

  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={styles.container}
    >
      <View style={styles.overlay} />
      <StyledText variant="title">גימטריה</StyledText>
      <StyledText variant="body">הכנס משפט וצפה בדבר השם</StyledText>
      <StyledTextInput value={text} setValue={setText} />
      <StyledButton title="חולל" onPress={handlePress} />
      <View style={styles.outputContainer}>
        <RabbiShake />
        <View style={styles.innerOutputContainer}>
          <StyledText variant="subtitle">תוצאה:</StyledText>
          {!loading && (
            <StyledText variant="body">{selectedWord?.word}</StyledText>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 10,
    borderColor: COLORS.gold,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Makes it fill the entire parent
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  outputContainer: {
    marginTop: 40,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  innerOutputContainer: {
    width: "60%",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
