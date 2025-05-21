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
      description TEXT
    );`
  );

  await database.execAsync(
    `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      dateOfExpiration TEXT NOT NULL,
      code TEXT
    );`
  );

  await database.execAsync(
    `CREATE TABLE IF NOT EXISTS product_place (
      id INTEGER PRIMARY KEY NOT NULL,
      place_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );`
  );

  return database;
}

export async function listMetaDataOfDatabase() {
  if (!database) {
    console.warn("Database is not yet initialized!");
    return;
  }

  const tables = await database.getAllAsync(
    `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';`
  );

  console.log("📋 Existing tables in database:");
  const result = {};

  for (const { name } of tables) {
    console.log(`\n🔹 Table: ${name}`);

    try {
      // 🔍 Pobranie kolumn (metadane)
      const columns = await database.getAllAsync(`PRAGMA table_info(${name});`);
      console.log("   📌 Columns:");
      columns.forEach((col) => {
        console.log(`     - ${col.name} (${col.type})`);
      });

      // 📄 Pobranie rekordów
      const records = await database.getAllAsync(`SELECT * FROM ${name};`);

      if (records.length === 0) {
        console.log("   (No records)");
      } else {
        console.table(records);
      }

      result[name] = {
        columns,
        records,
      };
    } catch (err) {
      console.error(`❌ Error during fetching data from database "${name}":`, err);
      result[name] = `Error: ${err.message}`;
    }
  }

  return result;
}