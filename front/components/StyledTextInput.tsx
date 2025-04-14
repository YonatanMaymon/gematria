import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";

export default function StyledTextInput(props: {
  value: string;
  setValue: (text: string) => void;
}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="הכנס משפט"
        value={props.value}
        onChangeText={props.setValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "80%",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 30,
    paddingHorizontal: 15,
    fontSize: 18,
    fontFamily: "StamAshkenazCLM",
    backgroundColor: "#fff",
  },
});
