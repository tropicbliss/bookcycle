import { getDb } from "$lib/server/db";
import { type Actions, fail, redirect } from "@sveltejs/kit";
import * as auth from "$lib/server/auth";

export const actions: Actions = {
    logout: async (event) => {
        console.log("hi");
        if (!event.locals.session) {
            return fail(401);
        }
        const db = getDb(event.platform!.env.DB);
        await auth.invalidateSession(db, event.locals.session.id);
        auth.deleteSessionTokenCookie(event);

        return redirect(302, "/");
    },
};
