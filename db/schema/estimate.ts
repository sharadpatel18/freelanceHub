import {
  date,
  doublePrecision,
  json,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { projects } from "./projects";
import { usersTable } from "./user";

export const estimateTable = pgTable("estimates", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").references(() => projects.id),
  freelancerId: uuid("freelancer_id").references(() => usersTable.id),
  amount: doublePrecision("amount").notNull(),
  message: text("message").notNull(),
  attachments: json("attachments"), // optional
  validUntil: timestamp("valid_until"),
  terms: text("terms"),
  status: varchar("status").default("pending"), // pending | accepted | rejected
  createdAt: timestamp("created_at").defaultNow(),
});
