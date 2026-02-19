import { DB } from "./types";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

let db: Kysely<DB> | null = null;

export function getDB(): Kysely<DB> {
  if (!db) {
    const dialect = new PostgresDialect({
      pool: new Pool({
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        max: 10,
      }),
    });
    db = new Kysely<DB>({ dialect });
  }
  return db;
}

export async function destroyDB() {
  if (db) {
    await db.destroy();
    db = null;
  }
}