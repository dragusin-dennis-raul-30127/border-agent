// borderFormSchema.ts
import { z } from "zod";

export const borderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  areTrucksAllowed: z.boolean(),
});

export type BorderFormValues = z.infer<typeof borderSchema>;
