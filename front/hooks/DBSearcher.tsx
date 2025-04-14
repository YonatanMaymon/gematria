import { useState, useCallback } from "react";
import * as SQLite from "expo-sqlite";
import { loadDatabase } from "@/functions/DBUtil";

// Define the type for rows in the database.
export interface Word {
  id: number;
  word: string;
  gematria_value: number;
  type: string;
}

// Open the pre-populated database. Make sure it is bundled with your app.
const loadDB = loadDatabase();

export const useGematriaSearch = () => {
  const [results, setResults] = useState<Word[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (value: number) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Searching for gematria value:", value);
      const db = await loadDB;
      const statement = await db.prepareAsync(
        "SELECT * FROM hebrew_words WHERE gematria_value = ?"
      );
      const resultSet = await statement.executeAsync([value]);
      const words = await resultSet.getAllAsync();
      setResults(words as Word[]);
      setLoading(false);
      await statement.finalizeAsync();
    } catch (err) {
      setLoading(false);
      setError("An error occurred while fetching data.");
      console.error(err);
    }
  }, []);

  return { results, loading, error, search };
};
