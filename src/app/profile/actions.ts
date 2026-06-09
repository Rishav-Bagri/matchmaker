"use server";

import prisma from "@/src/lib/prisma"
import { revalidatePath } from "next/cache"
import { MatchStatus, DateStatus, JourneyStatus } from "@/src/generated/prisma"

/**
 * Updates the journey status of a profile/client
 */
export async function updateJourneyStatus(profileId: string, status: JourneyStatus) {
  try {
    await prisma.customerJourney.upsert({
      where: { userId: profileId },
      update: { status, lastContactAt: new Date() },
      create: { userId: profileId, status, lastContactAt: new Date() }
    })
    revalidatePath(`/profile`)
    revalidatePath(`/customers`)
    return { success: true }
  } catch (error: any) {
    console.error("Failed to update journey status:", error)
    return { success: false, error: error.message || "Failed to update status" }
  }
}

/**
 * Updates the status of a Match
 */
export async function updateMatchStatus(matchId: string, status: MatchStatus) {
  try {
    await prisma.match.update({
      where: { id: matchId },
      data: { status }
    })
    revalidatePath(`/profile`)
    return { success: true }
  } catch (error: any) {
    console.error("Failed to update match status:", error)
    return { success: false, error: error.message || "Failed to update match status" }
  }
}

/**
 * Updates the notes and status of a DateRecord
 */
export async function updateDateNotes(dateId: string, notes: string, status?: DateStatus) {
  try {
    await prisma.dateRecord.update({
      where: { id: dateId },
      data: {
        notes,
        ...(status ? { status } : {})
      }
    })
    revalidatePath(`/profile`)
    return { success: true }
  } catch (error: any) {
    console.error("Failed to update date notes:", error)
    return { success: false, error: error.message || "Failed to update date notes" }
  }
}

/**
 * Creates a new DateRecord under a Match
 */
export async function createDateRecord(matchId: string, dateScheduledAtStr: string, notes: string, status: DateStatus) {
  try {
    const dateScheduledAt = new Date(dateScheduledAtStr)
    if (isNaN(dateScheduledAt.getTime())) {
      throw new Error("Invalid date/time format")
    }

    await prisma.dateRecord.create({
      data: {
        matchId,
        dateScheduledAt,
        notes,
        status
      }
    })

    // Update last activity on the customer journey
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      select: { profileId: true, matchedProfileId: true }
    })

    if (match) {
      await prisma.customerJourney.updateMany({
        where: { userId: { in: [match.profileId, match.matchedProfileId] } },
        data: { lastContactAt: new Date() }
      })
    }

    revalidatePath(`/profile`)
    return { success: true }
  } catch (error: any) {
    console.error("Failed to create date record:", error)
    return { success: false, error: error.message || "Failed to create date record" }
  }
}

/**
 * Proposes a new match between two profiles
 */
export async function proposeMatch(profileId: string, matchedProfileId: string) {
  try {
    // Check if match already exists in either direction
    const existing = await prisma.match.findFirst({
      where: {
        OR: [
          { profileId, matchedProfileId },
          { profileId: matchedProfileId, matchedProfileId: profileId }
        ]
      }
    })

    if (existing) {
      throw new Error("A connection between these profiles already exists")
    }

    await prisma.match.create({
      data: {
        profileId,
        matchedProfileId,
        status: MatchStatus.PROPOSED
      }
    })

    revalidatePath(`/profile`)
    return { success: true }
  } catch (error: any) {
    console.error("Failed to propose match:", error)
    return { success: false, error: error.message || "Failed to propose match" }
  }
}
