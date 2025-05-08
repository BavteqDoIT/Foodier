# 🍱 Foodier

**Foodier** is a mobile app built with **React Native** and **Expo** that helps you organize food storage **places** and track associated **products** with expiration dates. It uses a local **SQLite** database for offline persistence.

---

## 🧰 Tech Stack

- ✅ React Native (Expo)
- ✅ SQLite (`expo-sqlite`)
- ✅ React Navigation
- ✅ JavaScript (ES6+)

---

## 🛠️ Features

- 📍 Add and manage **Places** (e.g., fridge, pantry, basement)
- 🛒 Add and manage **Products**, each with an expiration date
- 🔗 Associate **Products** with **Places**
- 🗃️ Local SQLite database with proper schema and foreign key constraints
- 🌀 App loading indicator while initializing DB
- 🧭 Navigation between screens

---

## 🧪 Database Structure

All tables are created in `util/database.js`. The structure is as follows:

### Table: `places`

| Field         | Type     | Description           |
|---------------|----------|-----------------------|
| `id`          | INTEGER  | Primary Key           |
| `name`        | TEXT     | Place name            |
| `description` | TEXT     | Optional description  |

### Table: `products`

| Field              | Type    | Description             |
|--------------------|---------|-------------------------|
| `id`               | INTEGER | Primary Key             |
| `name`             | TEXT    | Product name            |
| `dateOfExpiration` | TEXT    | Expiration date string  |

### Table: `product_place`

| Field        | Type    | Description                       |
|--------------|---------|-----------------------------------|
| `id`         | INTEGER | Primary Key                       |
| `place_id`   | INTEGER | Foreign key → `places(id)`        |
| `product_id` | INTEGER | Foreign key → `products(id)`      |

All foreign keys use `ON DELETE CASCADE`.

---

## 📱 App Entry: `App.js`

Handles the following responsibilities:

- Status bar appearance
- Initial database setup using `init()` function
- Navigation structure with React Navigation
- Conditional loading screen using `ActivityIndicator` while the DB initializes

---

## 🚀 Getting Started

1. Clone the Repository
git clone https://github.com/BavteqDoIT/foodier.git
cd foodier

2. Install Dependencies
npm install

3. Run the App
npx expo start

🔖 License
MIT © 2025

📌 Notes
Designed to work offline using SQLite storage

Ideal for managing household storage or prepping