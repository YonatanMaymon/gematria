import { gematriaMap } from "@/constants/gematria";
import * as SQLite from "expo-sqlite";

export function getGematriaValue(text: string) {
  const val = [...text].reduce(
    (sum, char) => sum + (gematriaMap[char] || 0),
    0
  );
  console.log("Gematria value:", val);
  return val;
}

export interface Word {
  id: number;
  word: string;
  gematria_value: number;
  type: string;
}
export const search = async (db: SQLite.SQLiteDatabase, value: number) => {
  try {
    const statement = await db.prepareAsync(
      "SELECT * FROM hebrew_words WHERE gematria_value = ?"
    );
    const resultSet = await statement.executeAsync([value]);
    const results = await resultSet.getAllAsync();
    await statement.finalizeAsync();
    return results as Word[];
  } catch (err) {
    console.error(err);
    return [];
  }
};
