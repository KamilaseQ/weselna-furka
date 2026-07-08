import { neon } from "@neondatabase/serverless";

type SqlClient = ReturnType<typeof neon>;

let client: SqlClient | null = null;

export function getDb(): SqlClient {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!client) {
    client = neon(databaseUrl);
  }

  return client;
}
