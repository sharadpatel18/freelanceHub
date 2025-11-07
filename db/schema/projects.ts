import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  doublePrecision,
  json,
  pgEnum,
} from "drizzle-orm/pg-core";
import { usersTable } from "./user";

export const budgetTypeEnum = pgEnum("budget_type", ["fixed", "hourly"]);
export const projectStatusEnum = pgEnum("project_status", [
  "open",
  "in_progress",
  "completed",
  "cancelled",
]);

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),

  clientId: uuid("client_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),

  category: varchar("category", { length: 100 }),
  subCategory: varchar("sub_category", { length: 100 }),

  budgetType: budgetTypeEnum("budget_type").notNull(),

  // ✅ store as numbers, not strings
  minBudget: doublePrecision("min_budget"),
  maxBudget: doublePrecision("max_budget"),

  expectedDuration: varchar("expected_duration", { length: 100 }),

  skills: json("skills").$type<string[]>().default([]),
  attachments: json("attachments").$type<string[]>().default([]),

  locationPreference: varchar("location_preference", { length: 100 }).default(
    "remote"
  ),
  status: projectStatusEnum("status").default("open").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
