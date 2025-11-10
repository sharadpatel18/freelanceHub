import {
  date,
  json,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { projects } from "./projects";
import { usersTable } from "./user";

const estimateTable = pgTable("estimates", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").references(() => projects.id),
  freelancerId: uuid("freelancer_id").references(() => usersTable.id),
  amount: numeric("amount").notNull(),
  duration: varchar("duration").notNull(), // e.g. "10 days"
  message: text("message").notNull(),
  milestones: json("milestones"), // optional array
  attachments: json("attachments"), // optional
  validUntil: date("valid_until"),
  terms: text("terms"),
  status: varchar("status").default("pending"), // pending | accepted | rejected
  createdAt: timestamp("created_at").defaultNow(),
});
