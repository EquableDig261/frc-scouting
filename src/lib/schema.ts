import { z } from "zod";

export const requiredString = z.string().min(1, { message: "Required" });

export const requiredNumber = z.number().int().min(1, { message: "Required" });

export const cycleSchema = z.object({
  "Coral Level 1": z.number().int().min(0).optional().default(0),
  "Coral Level 1 Missed": z.number().int().min(0).optional().default(0),
  "Coral Level 2": z.number().int().min(0).optional().default(0),
  "Coral Level 2 Missed": z.number().int().min(0).optional().default(0),
  "Coral Level 3": z.number().int().min(0).optional().default(0),
  "Coral Level 3 Missed": z.number().int().min(0).optional().default(0),
  "Coral Level 4": z.number().int().min(0).optional().default(0),
  "Coral Level 4 Missed": z.number().int().min(0).optional().default(0),
  "Algae Processor": z.number().int().min(0).optional().default(0),
  "Algae Barge": z.number().int().min(0).optional().default(0),
  "Algae Barge Missed": z.number().int().min(0).optional().default(0),
});

export const notes = z.object({
  text: z.string(),
});
