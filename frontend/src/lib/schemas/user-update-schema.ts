import { z } from "zod";

export const userUpdateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  badgeNumber: z.preprocess(
    (val) => (val !== "" ? Number(val) : undefined),
    z.number({
      required_error: "Badge number is required",
      invalid_type_error: "Badge number must be a number",
    })
  ),
  borderId: z.string().min(1, "Border is required"),
  isAdmin: z.boolean(),
});

export type UserUpdateFormValues = z.infer<typeof userUpdateSchema>;
