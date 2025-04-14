import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { Asset } from "expo-asset";

/**
 * Copies a pre-bundled SQLite DB from assets into a writable location,
 * then opens it using Expo SQLite.
 */
export async function loadDatabase(): Promise<SQLite.SQLiteDatabase> {
  const dbName = "hebrew_words.db";
  const dbPath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  // You must statically import the asset
  const asset = Asset.fromModule(require("../assets/hebrew_words.db"));

  // Ensure the SQLite folder exists
  const dir = `${FileSystem.documentDirectory}SQLite`;
  const dirInfo = await FileSystem.getInfoAsync(dir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }

  // Only copy the DB if it doesn't exist yet
  const fileInfo = await FileSystem.getInfoAsync(dbPath);
  if (!fileInfo.exists) {
    await asset.downloadAsync(); // Make sure it's ready
    await FileSystem.copyAsync({
      from: asset.localUri!,
      to: dbPath,
    });
    console.log("Database copied to device");
  }

  // Open and return the database
  return SQLite.openDatabaseSync(dbName);
}
