import * as SQLite from "expo-sqlite";

let database;

export async function init() {
  if (!database) {
    database = await SQLite.openDatabaseAsync("foodier.db");
  }

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      description TEXT
    );
  `);

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      dateOfExpiration TEXT NOT NULL,
      code TEXT,
      place_id INTEGER,
      FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE SET NULL
    );
  `);

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
      const columns = await database.getAllAsync(`PRAGMA table_info(${name});`);
      console.log("   📌 Columns:");
      columns.forEach((col) => {
        console.log(`     - ${col.name} (${col.type})`);
      });

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
      console.error(
        `❌ Error during fetching data from database "${name}":`,
        err
      );
      result[name] = `Error: ${err.message}`;
    }
  }

  return result;
}

export async function getProductsForPlace(placeId) {
  const db = await init();
  return db.getAllAsync(
    `
    SELECT * FROM products
    WHERE place_id = ?;
  `,
    [placeId]
  );
}

export async function getUnlinkedProducts() {
  const db = await init();
  return db.getAllAsync(`
    SELECT * FROM products
    WHERE place_id IS NULL;
  `);
}

export async function getPlaceForProduct(productId) {
  const db = await init();
  return db.getFirstAsync(
    `
    SELECT pl.*
    FROM places pl
    JOIN products p ON p.place_id = pl.id
    WHERE p.id = ?;
  `,
    [productId]
  );
}

export async function getAllPlaces() {
  const db = await init();
  return db.getAllAsync(`SELECT * FROM places;`);
}

export async function linkProductToPlace(productId, placeId) {
  const db = await init();
  return db.runAsync(
    `
    UPDATE products
    SET place_id = ?
    WHERE id = ?;
  `,
    [placeId, productId]
  );
}

export async function unlinkProduct(productId) {
  const db = await init();
  return db.runAsync(
    `
    UPDATE products
    SET place_id = NULL
    WHERE id = ?;
  `,
    [productId]
  );
}

export async function resetDatabase() {
  const db = await init();

  await db.execAsync(`DROP TABLE IF EXISTS product_place;`);
  await db.execAsync(`DROP TABLE IF EXISTS products;`);
  await db.execAsync(`DROP TABLE IF EXISTS places;`);

  await init();
}
