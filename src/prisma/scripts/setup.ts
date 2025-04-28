import path from "path";
import fs from "fs";

// Ensure the database file is created
const dbPath = path.resolve(__dirname, "../db/database.db");

// Ensure the directory exists
const dirPath = path.dirname(dbPath);
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

// Ensure the file exists
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, "");
  console.log("Created database file at:", dbPath);
} else {
  console.log("Database file already existing:", dbPath);
}
