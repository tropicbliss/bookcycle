import { ne } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { inventory } from "$lib/server/db/schema";
import { getDb } from "$lib/server/db";

export const load: PageServerLoad = async (event) => {
    const userId = event.locals.user?.id ?? "";
    const db = await getDb(event.platform!.env.DB);
    const books = await db.select().from(inventory).where(
        ne(inventory.userId, userId),
    );
    return { books };
};
