import z from "zod";

export const estimateSchema = z.object({
  amount: z.number().nonnegative().nonoptional("amount is required"),
  message: z.string().min(1).nonoptional("message is required"),
  attachments: z.array(z.string()).optional(),
  validUntil: z
    .string()
    .transform((d) => new Date(d))
    .nullable(),
  terms: z.string().optional(),
});
