import {
  pgTable,
  real,
  uuid,
  text,
  timestamp,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";

// Define the Role enum
export const roleEnum = pgEnum("role", ["FREELANCER", "CLIENT", "ADMIN"]);

export const usersTable = pgTable("users", {
  // Core authentication fields (required at signup)
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),

  // Profile fields (optional, filled after login)
  username: text("username").unique(),
  role: roleEnum("role").default("FREELANCER").notNull(),
  profileImage: text("profile_image"),
  bio: text("bio"),
  about: text("about"),
  location: text("location"),
  timezone: text("timezone"),
  skills: text("skills").array(), // Array of strings
  languages: text("languages").array(), // Array of strings
  hourlyRate: real("hourly_rate"), // Use real for decimal numbers
  isVerified: boolean("is_verified").default(false).notNull(),
  isEmailVerified: boolean("is_email_verified").default(false).notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// TypeScript type inference
export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;
