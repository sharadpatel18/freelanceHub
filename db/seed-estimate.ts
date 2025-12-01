import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { estimateTable } from "./schema/estimate";
import { v4 as uuid } from "uuid";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const db = drizzle(pool);

const estimateSeeds = [
  {
    id: uuid(),
    projectId: "885714bd-ee19-474c-8fa8-4e0fda28e20d", // replace with real project ID
    freelancerId: "885714bd-ee19-474c-8fa8-4e0fda28e20d", // replace with user ID
    amount: 12000,
    message:
      "I will design and develop your portfolio website with responsive UI and animations.",
    attachments: ["proposal.pdf"],
    validUntil: new Date("2025-05-10"),
    terms: "50% upfront and 50% after final delivery.",
    status: "pending",
  },
  {
    id: uuid(),
    projectId: "885714bd-ee19-474c-8fa8-4e0fda28e20d",
    freelancerId: "885714bd-ee19-474c-8fa8-4e0fda28e20d",
    amount: 20000,
    message:
      "I will create a complete REST API with auth, bookings, and admin panel.",
    attachments: [],
    validUntil: new Date("2025-04-25"),
    terms: "Full payment on completion.",
    status: "accepted",
  },
  {
    id: uuid(),
    projectId: "885714bd-ee19-474c-8fa8-4e0fda28e20d",
    freelancerId: "885714bd-ee19-474c-8fa8-4e0fda28e20d",
    amount: 5000,
    message:
      "Delivering UI/UX screens with clean layout and typography. Includes 10 screens.",
    attachments: ["ui_mockups.png"],
    validUntil: new Date("2025-06-15"),
    terms: "50% upfront. Rest after Figma handoff.",
    status: "rejected",
  },
];

async function main() {
  try {
    console.log("🌱 Seeding estimates...");

    await db.insert(estimateTable).values(estimateSeeds);

    console.log("✅ Estimate Seed Completed!");
  } catch (error) {
    console.error("❌ Seeding Error:", error);
  } finally {
    await pool.end();
  }
}

main();
