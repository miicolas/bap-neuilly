import { mysqlTable, varchar, text, datetime, int, boolean, primaryKey, timestamp } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const EventAttendee = mysqlTable("event_attendee", {
    id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => sql`(uuid())`),
    createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: datetime("updatedAt").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
    firstName: varchar("firstName", { length: 255 }).notNull(),
    lastName: varchar("lastName", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    person: int("person").default(1),
    gender: text("gender", { enum: ["MALE", "FEMALE", "OTHER"] }).notNull(),
    age: int("age").notNull(),
    city: varchar("city", { length: 255 }).notNull(),
    ticketNumber: varchar("ticketNumber", { length: 255 }),
});

export const user = mysqlTable("user", {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: text('name').notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    emailVerified: boolean('email_verified').notNull(),
    role: text("role", { enum: ["USER", "SELLER", "ADMIN"] }).default("USER"),
    image: text('image'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull()
});

export const session = mysqlTable("session", {
    id: varchar("id", { length: 36 }).primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: varchar('token', { length: 255 }).notNull().unique(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: varchar('user_id', { length: 36 }).notNull().references(() => user.id)
});

export const account = mysqlTable("account", {
    id: varchar("id", { length: 36 }).primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: varchar('user_id', { length: 36 }).notNull().references(() => user.id),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull()
});

export const verification = mysqlTable("verification", {
    id: varchar("id", { length: 36 }).primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at'),
    updatedAt: timestamp('updated_at')
});

export const notification = mysqlTable("notification", {
    id: varchar("id", { length: 36 }).primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    read: boolean('read').notNull(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    type: varchar('type', { length: 255 }).notNull(),
});

export const ImageTable = mysqlTable("image", {
    id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => sql`(uuid())`),
    createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: datetime("updatedAt").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
    exposantId: varchar("exposantId", { length: 191 }).notNull(),
    picture: text("picture").notNull(),
});

export const ExposantTable = mysqlTable("exposant", {
    id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => sql`(uuid())`),
    createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: datetime("updatedAt").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
    firstName: varchar("firstName", { length: 255 }).notNull(),
    lastName: varchar("lastName", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    type: varchar("type", { length: 255 }).notNull(),
    adresse: varchar("adresse", { length: 255 }).notNull(),
    city: varchar("city", { length: 255 }).notNull(),
    postalCode: varchar("postalCode", { length: 20 }).notNull(),
    siret: varchar("siret", { length: 14 }).notNull(),
    products: text("products").notNull(),
    history: text("history").notNull(),
    companyName: varchar("companyName", { length: 255 }).notNull(),
    status: text("status", { enum: ["pending", "accepted", "refused"] }).notNull(),
    exposantId: varchar("exposantId", { length: 191 }).unique(),
    logo: varchar("logo", { length: 191 }).references(() => ImageTable.id),
    picture: varchar("picture", { length: 191 }).references(() => ImageTable.id),
    picture2: varchar("picture2", { length: 191 }).references(() => ImageTable.id),
    picture3: varchar("picture3", { length: 191 }).references(() => ImageTable.id),
    picture4: varchar("picture4", { length: 191 }).references(() => ImageTable.id),
    userId: varchar("userId", { length: 36 }).references(() => user.id),
});
