import { type Actions, error, fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { getDb } from "$lib/server/db";
import { inventory } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
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
    exchange: async (event) => {
        const takeSchema = z.object({
            id: z.number({ coerce: true }),
        });
        const takeData = takeSchema.safeParse(event.params);
        if (takeData.error) {
            return fail(400, { message: "Invalid input" });
        }
        const takeId = takeData.data.id;
        const giveSchema = z.number({ coerce: true });
        const userId = event.locals.user?.id;
        if (!userId) {
            return fail(400, { message: "User is not signed in" });
        }
        const formData = await event.request.formData();
        const book = formData.get("book");
        const data = giveSchema.safeParse(book);
        if (data.error) {
            return fail(400, { message: "Invalid input" });
        }
        const giveId = data.data;
        const db = getDb(event.platform!.env.DB);
        await db.transaction(async (tx) => {
            const targetBook = await tx.update(inventory).set({
                userId,
            }).where(
                eq(inventory.id, takeId),
            ).returning();
            if (targetBook.length === 0) {
                return;
            }
            const targetUserId = targetBook[0].userId;
            await tx.update(inventory).set({
                userId: targetUserId,
            }).where(eq(inventory.id, giveId));
        });
        return redirect(302, "/browse");
    },
};
