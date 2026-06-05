// src/lib/validations/partnerPreference.ts

import { z } from "zod"

export const PartnerPreferenceSchema = z.object({
  // Age Preference
  minAge: z.number()
    .int()
    .min(18)
    .max(100),

  maxAge: z.number()
    .int()
    .min(18)
    .max(100),

  // Height Preference
  minHeightCm: z.number()
    .int()
    .min(100)
    .max(250)
    .optional(),

  maxHeightCm: z.number()
    .int()
    .min(100)
    .max(250)
    .optional(),

  // Location
  country: z.string().optional(),

  city: z.string().optional(),

  // Religion
  religion: z.string().optional(),

  caste: z.string().optional(),

  // Education
  highestQualification: z.string().optional(),

  // Career
  minIncome: z.number()
    .min(0)
    .optional(),

  // Lifestyle
  foodPreference: z.enum([
    "VEG",
    "EGGETARIAN",
    "NON_VEG",
    "JAIN"
  ]).optional(),

  smoking: z.enum([
    "NO",
    "OCCASIONALLY",
    "YES"
  ]).optional(),

  drinking: z.enum([
    "NO",
    "OCCASIONALLY",
    "YES"
  ]).optional(),

  // Family
  haveChildren: z.boolean().optional(),

  maritalStatus: z.enum([
    "NEVER_MARRIED",
    "DIVORCED",
    "WIDOWED"
  ]).optional(),

  // Future
  wantKids: z.enum([
    "YES",
    "NO",
    "MAYBE"
  ]).optional(),

  openToRelocate: z.enum([
    "YES",
    "NO",
    "MAYBE"
  ]).optional(),

  openToPets: z.enum([
    "YES",
    "NO",
    "MAYBE"
  ]).optional(),

  // Soft Filter (Embedding)
  partnerDescription: z.string()
    .min(20)
    .max(3000)
    .optional()
})
.refine(
  data => data.maxAge >= data.minAge,
  {
    path: ["maxAge"],
    message: "maxAge must be greater than or equal to minAge"
  }
)
.refine(
  data =>
    !data.minHeightCm ||
    !data.maxHeightCm ||
    data.maxHeightCm >= data.minHeightCm,
  {
    path: ["maxHeightCm"],
    message: "maxHeightCm must be greater than or equal to minHeightCm"
  }
)

export type PartnerPreferenceInput =
  z.infer<typeof PartnerPreferenceSchema>