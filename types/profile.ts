// src/lib/validations/profile.ts

import { z } from "zod"

export const ProfileSchema = z.object({
  // Identity
  firstName: z.string().min(2).max(50),

  lastName: z.string().min(2).max(50),

  gender: z.enum([
    "MALE",
    "FEMALE",
    "OTHER"
  ]),

  dateOfBirth: z.coerce.date(),

  email: z.email(),

  phoneNumber: z.string().min(10).max(15),

  nationality: z.string().min(2),

  country: z.string().min(2),

  city: z.string().min(2),

  motherTongue: z.string().min(2),

  religion: z.string().min(2),

  caste: z.string().optional(),

  // Physical

  heightCm: z.number()
    .int()
    .min(100)
    .max(250),

  weightKg: z.number()
    .int()
    .min(30)
    .max(300)
    .optional(),

  // Education

  collegeName: z.string().min(2),

  degree: z.string().min(2),

  highestQualification: z.string().min(2),

  // Career

  currentCompany: z.string().min(2),

  designation: z.string().min(2),

  annualIncome: z.number()
    .min(0)
    .optional(),

  // Family

  brothers: z.number()
    .int()
    .min(0)
    .default(0),

  sisters: z.number()
    .int()
    .min(0)
    .default(0),

  maritalStatus: z.enum([
    "NEVER_MARRIED",
    "DIVORCED",
    "WIDOWED"
  ]),

  haveChildren: z.boolean(),

  // Lifestyle

  foodPreference: z.enum([
    "VEG",
    "EGGETARIAN",
    "NON_VEG",
    "JAIN"
  ]),

  smoking: z.enum([
    "NO",
    "OCCASIONALLY",
    "YES"
  ]),

  drinking: z.enum([
    "NO",
    "OCCASIONALLY",
    "YES"
  ]),

  lifestyle: z.string().optional(),

  hobbies: z.array(
    z.string().min(1)
  ).min(1),

  personalityType: z.enum([
    "INTROVERT",
    "AMBIVERT",
    "EXTROVERT"
  ]),

  // Matchmaking

  manglikStatus: z.enum([
    "YES",
    "NO",
    "UNKNOWN"
  ]),

  horoscopeAvailable: z.boolean(),

  disabilityStatus: z.string().optional(),

  // Future

  wantKids: z.enum([
    "YES",
    "NO",
    "MAYBE"
  ]),

  kidsCountPreference: z.enum([
    "ONE",
    "TWO_TO_THREE",
    "THREE_OR_MORE",
    "OPEN"
  ]).optional().nullable(),

  openToRelocate: z.enum([
    "YES",
    "NO",
    "MAYBE"
  ]),

  openToPets: z.enum([
    "YES",
    "NO",
    "MAYBE"
  ]),

  wantToWorkAfterMarriage: z.enum([
    "YES",
    "NO",
    "MAYBE"
  ]),

  // Languages

  languagesKnown: z.array(
    z.string()
  ).min(1),

  // AI Matching Fields

  aboutMe: z.string()
    .min(50)
    .max(3000),

  familyValues: z.string()
    .optional(),

  careerGoals: z.string()
    .optional(),

  relationshipValues: z.string()
    .optional(),

  futurePlans: z.string()
    .optional(),

  lookingFor: z.string()
    .min(20),

  partnerExpectations: z.string()
    .optional(),

  // Misc

  additionalInfo: z.string()
    .optional(),

  // Media

  profilePictures: z.array(
    z.string()
  ).default([]),

  isVerified: z.boolean()
    .default(false)
})

export type ProfileInput =
  z.infer<typeof ProfileSchema>