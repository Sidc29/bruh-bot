import { z } from "zod";

export const origanizationDetailsSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  websiteUrl: z.string().url("Please enter a valid URL"),
  description: z.string().min(1, "Company description is required"),
});
