import { z } from "zod";

export const userRegistrationSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  verificationCode: z.string().refine(
    (val) => {
      if (val) {
        return /^\d{6}$/.test(val);
      }
      return true;
    },
    {
      message: "Verification code must be 6 digits",
    }
  ),
});
