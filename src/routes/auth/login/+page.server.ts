import { fail, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import * as auth from "$lib/server/auth";
import * as table from "$lib/server/db/schema";
import type { Actions, PageServerLoad } from "./$types";
import { getDb } from "$lib/server/db";
import bcrypt from "bcryptjs";
import { validatePassword, validateUsername } from "$lib/server/auth";

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, "/");
	}
	return {};
};

export const actions: Actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get("username");
		const password = formData.get("password");

		if (!validateUsername(username)) {
			return fail(400, {
				message:
					"Invalid username (min 3, max 31 characters, alphanumeric only)",
			});
		}
		if (!validatePassword(password)) {
			return fail(400, {
				message: "Invalid password (min 6, max 255 characters)",
			});
		}

		const db = getDb(event.platform!.env.DB);
		const results = await db.select().from(table.user).where(
			eq(table.user.username, username),
		);

		const existingUser = results.at(0);
		if (!existingUser) {
			return fail(400, { message: "Incorrect username or password" });
		}

		const validPassword = bcrypt.compareSync(
			password,
			existingUser.passwordHash,
		);
		if (!validPassword) {
			return fail(400, { message: "Incorrect username or password" });
		}

		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(
			db,
			sessionToken,
			existingUser.id,
		);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return redirect(302, "/");
	},
};
