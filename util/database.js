import * as SQLite from "expo-sqlite";

let database;

export async function init() {
  if (!database) {
    database = await SQLite.openDatabaseAsync("foodier.db");
  }

  await database.execAsync(
    `CREATE TABLE IF NOT EXISTS places (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  description TEXT);`
  );

  await database.execAsync(
    `CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  dateOfExpiration TEXT NOT NULL);`
  );

  await database.execAsync(
    `CREATE TABLE IF NOT EXISTS product_place (
  id INTEGER PRIMARY KEY NOT NULL,
  place_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE);`
  );

  return database;
}
