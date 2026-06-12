import { NextRequest, NextResponse } from "next/server";
import { findTopMatches } from "@/src/lib/matching";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Missing customer ID" }, { status: 400 });
    }

    const matches = await findTopMatches(id);
    
    // Normalize format to simplify frontend usage
    const serializedMatches = matches.map((m) => ({
      score: m.score,
      profile: {
        id: m.profile.id,
        firstName: m.profile.firstName,
        lastName: m.profile.lastName,
        gender: m.profile.gender,
        dateOfBirth: m.profile.dateOfBirth,
        city: m.profile.city,
        designation: m.profile.designation,
        currentCompany: m.profile.currentCompany,
        maritalStatus: m.profile.maritalStatus,
      }
    }));

    return NextResponse.json({ success: true, matches: serializedMatches });
  } catch (error: any) {
    console.error(`Error finding top matches for client:`, error);
    return NextResponse.json(
      { error: error.message || "Failed to find matching candidates" },
      { status: 500 }
    );
  }
}
