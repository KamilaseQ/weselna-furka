import { pbkdf2Sync, randomBytes } from "crypto";
import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = createInterface({ input, output });
const password = await rl.question("Admin password: ");
rl.close();

if (!password || password.length < 10) {
  console.error("Password must be at least 10 characters.");
  process.exit(1);
}

const iterations = 310000;
const salt = randomBytes(16).toString("base64");
const hash = pbkdf2Sync(password, salt, iterations, 32, "sha256").toString(
  "base64"
);

console.log(`pbkdf2_sha256$${iterations}$${salt}$${hash}`);
