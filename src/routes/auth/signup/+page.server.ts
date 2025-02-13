import { encodeBase32LowerCase } from "@oslojs/encoding";
import { fail, redirect } from "@sveltejs/kit";
import * as auth from "$lib/server/auth";
import * as table from "$lib/server/db/schema";
import type { Actions } from "./$types";
import { getDb } from "$lib/server/db";
import bcrypt from "bcryptjs";
import { validatePassword, validateUsername } from "$lib/server/auth";

export const actions: Actions = {
    signup: async (event) => {
        const formData = await event.request.formData();
        const username = formData.get("username");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmpassword");

        if (!validateUsername(username)) {
            return fail(400, { message: "Invalid username" });
        }
        if (!validatePassword(password) || !validatePassword(confirmPassword)) {
            return fail(400, { message: "Invalid password" });
        }
        if (password != confirmPassword) {
            return fail(400, { message: "Password does not match" });
        }

        const userId = generateUserId();
        const passwordHash = bcrypt.hashSync(password);

        try {
            const db = getDb(event.platform!.env.DB);
            await db.insert(table.user).values({
                id: userId,
                username,
                passwordHash,
            });

            const sessionToken = auth.generateSessionToken();
            const session = await auth.createSession(db, sessionToken, userId);
            auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
        } catch (e) {
            if (e instanceof Error) {
                return fail(500, { message: e.stack });
            }
            return fail(500, { message: "An error has occurred" });
        }
        return redirect(302, "/");
    },
};

function generateUserId() {
    // ID with 120 bits of entropy, or about the same as UUID v4.
    const bytes = crypto.getRandomValues(new Uint8Array(15));
    const id = encodeBase32LowerCase(bytes);
    return id;
}
