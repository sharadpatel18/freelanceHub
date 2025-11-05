import z from "zod";

export const projectSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  category: z.string().min(1),
  subCategory: z.string().min(1),
  budgetType: z.enum(["fixed", "hourly"]),
  minBudget: z.number().nonnegative().nonoptional("min budget is required"),
  maxBudget: z.number().nonnegative().nonoptional("max budget is required"),
  expectedDuration: z.string().min(1),
  skills: z.array(z.string()).nonempty("skills is required"),
  locationPreference: z.enum(["remote", "onsite", "hybrid"]),
});
