import { pbkdf2Sync, randomBytes } from "crypto";
import { existsSync, readFileSync, writeFileSync } from "fs";

const envPath = ".env.local";
const passwordPath = ".admin-password.local.txt";

if (!existsSync(envPath)) {
  throw new Error(".env.local does not exist. Create it first.");
}

const password = randomBytes(18).toString("base64url");
const iterations = 310000;
const salt = randomBytes(16).toString("base64");
const hash = pbkdf2Sync(password, salt, iterations, 32, "sha256").toString(
  "base64"
);
const stored = `pbkdf2_sha256$${iterations}$${salt}$${hash}`;
const envStored = stored.replace(/\$/g, "\\$");

let env = readFileSync(envPath, "utf8").replace(/""/g, '"');
if (/^ADMIN_PASSWORD_HASH=.*$/m.test(env)) {
  env = env.replace(
    /^ADMIN_PASSWORD_HASH=.*$/m,
    `ADMIN_PASSWORD_HASH="${envStored}"`
  );
} else {
  env += `\nADMIN_PASSWORD_HASH="${envStored}"\n`;
}

writeFileSync(envPath, env);
writeFileSync(
  passwordPath,
  `Tymczasowe haslo admina do /admin/login:\n${password}\n`
);

console.log("ADMIN_HASH_SET");
console.log(`ADMIN_PASSWORD_FILE=${passwordPath}`);
