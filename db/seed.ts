import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { projects, budgetTypeEnum, projectStatusEnum } from "./schema/projects";

// 1. Connect to DB
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const db = drizzle(pool);

// 2. Seed data (use enums correctly)
const seedProjects: (typeof projects.$inferInsert)[] = [
  {
    clientId: "885714bd-ee19-474c-8fa8-4e0fda28e20d",
    title: "Portfolio Website Development",
    description:
      "I need a modern and responsive portfolio website built using Next.js and Tailwind CSS.",
    category: "Web Development",
    subCategory: "Frontend",
    budgetType: "fixed",
    minBudget: 8000,
    maxBudget: 15000,
    expectedDuration: "1-2 weeks",
    skills: ["Next.js", "Tailwind CSS", "Figma"],
    attachments: [],
    locationPreference: "remote",
    status: "open",
  },
  {
    clientId: "885714bd-ee19-474c-8fa8-4e0fda28e20d",
    title: "React Native Fitness App",
    description:
      "A simple fitness tracking mobile application with basic screens and offline storage.",
    category: "Mobile Development",
    subCategory: "React Native",
    budgetType: "hourly",
    minBudget: 10,
    maxBudget: 25,
    expectedDuration: "1 month",
    skills: ["React Native", "AsyncStorage", "Redux Toolkit"],
    attachments: [],
    locationPreference: "remote",
    status: "in_progress",
  },
  {
    clientId: "885714bd-ee19-474c-8fa8-4e0fda28e20d",
    title: "REST API for Booking System",
    description:
      "Build a scalable Node.js REST API with authentication, bookings, and admin features.",
    category: "Backend Development",
    subCategory: "Node.js",
    budgetType: "fixed",
    minBudget: 20000,
    maxBudget: 35000,
    expectedDuration: "3-4 weeks",
    skills: ["Node.js", "Express", "PostgreSQL", "JWT"],
    attachments: [],
    locationPreference: "remote",
    status: "open",
  },
  {
    clientId: "885714bd-ee19-474c-8fa8-4e0fda28e20d",
    title: "Mobile App UI/UX Design",
    description:
      "I need a clean and minimal UI/UX design for an ecommerce mobile app.",
    category: "Design",
    subCategory: "UI/UX",
    budgetType: "fixed",
    minBudget: 5000,
    maxBudget: 12000,
    expectedDuration: "2 weeks",
    skills: ["Figma", "Adobe XD"],
    attachments: [],
    locationPreference: "remote",
    status: "completed",
  },
  {
    clientId: "885714bd-ee19-474c-8fa8-4e0fda28e20d",
    title: "Job Portal Full-Stack Application",
    description:
      "A full-stack application with user roles, job posting, and resume uploads.",
    category: "Full Stack Development",
    subCategory: "MERN Stack",
    budgetType: "hourly",
    minBudget: 15,
    maxBudget: 40,
    expectedDuration: "2-3 months",
    skills: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    attachments: [],
    locationPreference: "remote",
    status: "open",
  },
];

async function main() {
  try {
    console.log("🌱 Seeding projects...");

    await db.insert(projects).values(seedProjects);

    console.log("✅ Seeding completed!");
  } catch (error) {
    console.error("❌ Seeding Error:", error);
  } finally {
    await pool.end();
  }
}

main();
