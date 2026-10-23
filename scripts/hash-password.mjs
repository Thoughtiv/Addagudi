// Usage: npm run admin:hash -- "your password"
import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];
if (!password || password.length < 8) {
  console.error('Usage: npm run admin:hash -- "a password of at least 8 characters"');
  process.exit(1);
}
const salt = randomBytes(16);
console.log(`ADMIN_PASSWORD_HASH=scrypt$${salt.toString("hex")}$${scryptSync(password, salt, 64).toString("hex")}`);
