import { z } from "zod";

export const controlFormSchema = z.object({
  driver: z.object({
    name: z.string().min(1, "Driver name is required"),
    documentNumber: z.string().min(1, "Document number is required"),
    documentType: z.enum(["ci", "passport"]),
  }),
  vehicle: z.object({
    type: z.enum(["car", "truck", "motorcycle"]),
    licensePlate: z.string().min(1),
    vinNumber: z.string().min(1),
    make: z.string().min(1),
    model: z.string().min(1),
    year: z.coerce.number().min(1900),
    weight: z.coerce.number().positive(),
  }),
  date: z.date().optional(),
  borderId: z.string().min(1),
  hasProblems: z.boolean(),
  problemDescription: z.string().optional(),
});
