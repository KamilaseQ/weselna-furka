import nextEnv from "@next/env";
import { neon } from "@neondatabase/serverless";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

const required = [
  "DATABASE_URL",
  "GMAIL_USER",
  "GMAIL_APP_PASSWORD",
  "OWNER_EMAIL",
  "EMAIL_FROM",
  "ADMIN_PASSWORD_HASH",
  "AUTH_SECRET",
  "NEXT_PUBLIC_SITE_URL",
];

const placeholders = /TU_|xxxx|change-me|your-|example|placeholder/i;
let failed = false;

function mark(ok, label, detail = "") {
  const icon = ok ? "OK " : "ERR";
  console.log(`${icon} ${label}${detail ? ` - ${detail}` : ""}`);
  if (!ok) failed = true;
}

for (const key of required) {
  const value = process.env[key]?.trim();
  const ok = Boolean(value) && !placeholders.test(value);
  const detail = !value ? "missing" : placeholders.test(value) ? "placeholder" : "set";
  mark(ok, key, detail);
}

const authSecret = process.env.AUTH_SECRET || "";
mark(authSecret.length >= 32, "AUTH_SECRET length", `${authSecret.length} chars`);

const adminHash = process.env.ADMIN_PASSWORD_HASH || "";
mark(
  /^pbkdf2_sha256\$\d+\$[^$]+\$[^$]+$/.test(adminHash),
  "ADMIN_PASSWORD_HASH format"
);

const gmailPassword = (process.env.GMAIL_APP_PASSWORD || "").replace(/\s/g, "");
mark(
  !gmailPassword || gmailPassword.length === 16,
  "GMAIL_APP_PASSWORD format",
  gmailPassword ? `${gmailPassword.length} chars without spaces` : "missing"
);

const databaseUrl = process.env.DATABASE_URL;
if (databaseUrl && !placeholders.test(databaseUrl)) {
  try {
    const sql = neon(databaseUrl);
    const ping = await sql`select now() as now`;
    mark(Boolean(ping?.[0]?.now), "Neon connection");

    const tables = await sql`
      select table_name
      from information_schema.tables
      where table_schema = 'public'
        and table_name in (
          'reservations',
          'calendar_blocks',
          'admin_login_attempts',
          'reservation_attempts'
        )
      order by table_name
    `;
    const found = tables.map((row) => row.table_name);
    const expected = [
      "admin_login_attempts",
      "calendar_blocks",
      "reservation_attempts",
      "reservations",
    ];
    mark(
      expected.every((name) => found.includes(name)),
      "Neon schema",
      found.length ? found.join(", ") : "no app tables found"
    );
  } catch (error) {
    mark(false, "Neon connection", error instanceof Error ? error.message : String(error));
  }
} else {
  mark(false, "Neon connection", "DATABASE_URL is missing or placeholder");
}

if (failed) {
  process.exit(1);
}

console.log("Setup check passed.");
