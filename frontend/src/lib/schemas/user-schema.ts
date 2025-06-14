import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  badgeNumber: z.coerce.number({
    required_error: "Badge number is required",
    invalid_type_error: "Badge number must be a number",
  }),
  borderId: z.string().min(1, "Border ID is required"),
  isAdmin: z.boolean(),
});

export type UserFormValues = z.infer<typeof userSchema>;
