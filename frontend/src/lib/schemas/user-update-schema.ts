import { z } from "zod";

export const userUpdateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  badgeNumber: z.number({
    required_error: "Badge number is required",
    invalid_type_error: "Badge number must be a number",
  }),
  borderId: z.string().min(1, "Border ID is required"),
  isAdmin: z.boolean(),
});

export type UserUpdateFormValues = z.infer<typeof userUpdateSchema>;
