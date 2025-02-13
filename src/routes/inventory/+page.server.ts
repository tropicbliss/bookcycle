import { getDb } from "$lib/server/db";
import { inventory } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { type Actions, error, fail, redirect } from "@sveltejs/kit";
import { z } from "zod";

export const load: PageServerLoad = async (event) => {
    const userId = event.locals.user?.id;
    if (!userId) {
        return error(400, "Not authenticated");
    }
    const db = await getDb(event.platform!.env.DB);
    const ownedBooks = await db.select().from(inventory).where(
        eq(inventory.userId, userId),
    );
    return { books: ownedBooks };
};

export const actions: Actions = {
    add: async (event) => {
        const schema = z.object({
            name: z.string().min(1),
            authors: z.string().min(1),
        });
        const userId = event.locals.user?.id;
        if (!userId) {
            return fail(400, { message: "User is not signed in" });
        }
        const formData = await event.request.formData();
        const name = formData.get("name");
        const authors = formData.get("authors");
        const data = schema.safeParse({ name, authors });
        if (data.error) {
            return fail(400, { message: "Invalid input" });
        }
        const db = getDb(event.platform!.env.DB);
        await db.insert(inventory).values({
            authors: data.data.authors,
            name: data.data.name,
            userId,
        });
        return redirect(302, "/inventory");
    },
    delete: async (event) => {
        const schema = z.number({ coerce: true });
        const userId = event.locals.user?.id;
        if (!userId) {
            return fail(400, { message: "User is not signed in" });
        }
        const formData = await event.request.formData();
        const id = formData.get("id");
        const data = schema.safeParse(id);
        if (data.error) {
            return fail(400, { message: "Invalid input" });
        }
        const db = getDb(event.platform!.env.DB);
        await db.delete(inventory).where(eq(inventory.id, data.data));
        return redirect(302, "/inventory");
    },
};
