import * as SQLite from "expo-sqlite";

let database;

export async function init() {
  if (!database) {
    database = await SQLite.openDatabaseAsync("foodier.db");
  }

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      code TEXT
    );
  `);

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      description TEXT
    );
  `);

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS place_product (
      id INTEGER PRIMARY KEY NOT NULL,
      place_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      dateOfExpiration TEXT NOT NULL,
      FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );
  `);

  return database;
}

// ------------------ PRODUCTS ------------------

export async function addProduct(name, code = null) {
  const db = await init();
  return db.runAsync(
    `INSERT INTO products (name, code) VALUES (?, ?);`,
    [name, code]
  );
}

export async function getAllProducts() {
  const db = await init();
  return db.getAllAsync(`SELECT * FROM products;`);
}

// ------------------ PLACES ------------------

export async function addPlace(name, description = null) {
  const db = await init();
  return db.runAsync(
    `INSERT INTO places (name, description) VALUES (?, ?);`,
    [name, description]
  );
}

export async function getAllPlaces() {
  const db = await init();
  return db.getAllAsync(`SELECT * FROM places;`);
}

// ------------------ PLACE_PRODUCT RELATION ------------------

export async function addProductToPlace(placeId, productId, dateOfExpiration) {
  const db = await init();
  return db.runAsync(
    `INSERT INTO place_product (place_id, product_id, dateOfExpiration) VALUES (?, ?, ?);`,
    [placeId, productId, dateOfExpiration]
  );
}

export async function getProductsInPlace(placeId) {
  const db = await init();
  return db.getAllAsync(
    `
    SELECT 
      pp.id as linkId,
      p.name,
      p.code,
      pp.dateOfExpiration
    FROM place_product pp
    JOIN products p ON pp.product_id = p.id
    WHERE pp.place_id = ?;
    `,
    [placeId]
  );
}

export async function removeProductFromPlace(linkId) {
  const db = await init();
  return db.runAsync(
    `DELETE FROM place_product WHERE id = ?;`,
    [linkId]
  );
}

// ------------------ UTILITIES ------------------

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

export async function resetDatabase() {
  const db = await init();

  await db.execAsync(`DROP TABLE IF EXISTS place_product;`);
  await db.execAsync(`DROP TABLE IF EXISTS products;`);
  await db.execAsync(`DROP TABLE IF EXISTS places;`);

  await init();
}
