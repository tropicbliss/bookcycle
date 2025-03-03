import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
	id: text("id").primaryKey(),
	age: integer("age"),
	username: text("username").notNull().unique(),
	passwordHash: text("password_hash").notNull(),
});

export const session = sqliteTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});

export const inventory = sqliteTable("inventory", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	userId: text("user_id").notNull().references(() => user.id, {
		onDelete: "cascade",
	}),
	name: text("name").notNull(),
	authors: text("authors").notNull(),
}, (t) => [
	index("user_idx").on(t.userId),
]);

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type Inventory = typeof inventory.$inferSelect;
