import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";

let drizzleInstance:
    | DB
    | undefined;

export function getDb(db: D1Database) {
    if (drizzleInstance === undefined) {
        drizzleInstance = drizzle(db);
    }
    return drizzleInstance;
}

export type DB = DrizzleD1Database<Record<string, never>> & {
    $client: D1Database;
};
