// Create or update an admin account in the database named by MONGODB_URI.
// Usage: npm run admin:create -- <username> <password>
import { randomBytes, scryptSync } from "node:crypto";
import mongoose from "mongoose";

const [username, password] = process.argv.slice(2);
if (!username || !password || password.length < 10) {
  console.error('Usage: npm run admin:create -- <username> "<password, at least 10 characters>"');
  process.exit(1);
}
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not set (put it in .env.local).");
  process.exit(1);
}

const salt = randomBytes(16);
const passwordHash = `scrypt$${salt.toString("hex")}$${scryptSync(password, salt, 64).toString("hex")}`;

await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
const admins = mongoose.connection.collection("admins");
await admins.createIndex({ username: 1 }, { unique: true });
const now = new Date();
const name = username.trim().toLowerCase();
const res = await admins.updateOne(
  { username: name },
  { $set: { passwordHash, updatedAt: now }, $setOnInsert: { username: name, createdAt: now } },
  { upsert: true },
);
console.log(`${res.upsertedCount ? "Created" : "Updated"} admin "${name}" in database "${mongoose.connection.name}".`);
await mongoose.disconnect();
