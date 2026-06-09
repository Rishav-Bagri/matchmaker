import prisma from "@/src/lib/prisma"
import MatchmakingWorkspace from "@/components/Dashboard/MatchmakingWorkspace"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verify } from "@/src/lib/jwt"

export default async function CustomerDashboardPage({
  params,
  searchParams,
}: {
  params: Promise<{ id?: string }>
  searchParams: Promise<{ id?: string }>
}) {
  const cookieStore = await cookies()
  const session = cookieStore.get("matchmaker_session")
  if (!session || !verify(session.value)) {
    redirect("/")
  }

  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const id = resolvedParams.id || resolvedSearchParams.id

  if (!id) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400 font-sans">
        <div className="border border-yellow-500/20 bg-zinc-900/50 p-8 text-center rounded-sm max-w-md">
          <h1 className="text-yellow-400 text-xl font-bold mb-2">No Profile Specified</h1>
          <p className="text-zinc-500">Please provide a profile ID in the URL params or query parameters.</p>
        </div>
      </div>
    )
  }

  const profile = await prisma.profile.findUnique({
    where: {
      id,
    },
    include: {
      partnerPreference: true,
      journey: true,
      matches: {
        include: {
          matchedProfile: true,
          dates: true,
        }
      },
      matchedBy: {
        include: {
          profile: true,
          dates: true,
        }
      }
    },
  })

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400 font-sans">
        <div className="border border-yellow-500/20 bg-zinc-900/50 p-8 text-center rounded-sm max-w-md">
          <h1 className="text-red-400 text-xl font-bold mb-2">Profile Not Found</h1>
          <p className="text-zinc-500">The profile with ID <code className="text-yellow-400/80 px-1 bg-yellow-400/5 border border-yellow-400/10 rounded-sm">{id}</code> could not be found.</p>
        </div>
      </div>
    )
  }

  // Fetch all other profiles for proposing matches
  const otherProfiles = await prisma.profile.findMany({
    where: {
      id: { not: id },
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      city: true,
      gender: true,
      designation: true,
    },
    orderBy: {
      firstName: "asc",
    }
  })

  // Normalize matches from both directions
  const directMatches = (profile.matches || []).map((m) => ({
    id: m.id,
    status: m.status,
    createdAt: m.createdAt,
    matchedProfile: m.matchedProfile,
    dates: m.dates || [],
  }))

  const inverseMatches = (profile.matchedBy || []).map((m) => ({
    id: m.id,
    status: m.status,
    createdAt: m.createdAt,
    matchedProfile: m.profile,
    dates: m.dates || [],
  }))

  const allMatches = [...directMatches, ...inverseMatches].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  // Calculate age
  const birthDate = new Date(profile.dateOfBirth)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-zinc-900 font-luxury-sans pb-16 antialiased">
      {/* Injecting Cormorant Garamond & Montserrat Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Montserrat:wght@200;300;400;500;600&display=swap');
        .font-luxury-serif {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .font-luxury-sans {
          font-family: 'Montserrat', Inter, sans-serif;
        }
      `}</style>
      
      {/* Editorial Header */}
      <header className="border-b border-[#E5E2DA] bg-white pt-12 pb-6 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex justify-between items-center">
            <a
              href="/customers"
              className="inline-flex items-center text-[10px] uppercase tracking-[0.25em] text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              ← Back to Clients List
            </a>
            
            <a
              href={`/profile?id=${profile.id}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-[10px] uppercase tracking-[0.25em] text-zinc-600 hover:text-zinc-950 transition-colors border border-[#E5E2DA] px-3 py-1 bg-[#FBFBFA]"
            >
              View Shareable Profile ↗
            </a>
          </div>

          {/* Client Title */}
          <div className="mt-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
              Admin Matchmaking Workspace
            </p>
            <h1 className="mt-2 font-luxury-serif text-5xl md:text-6xl text-zinc-900 leading-none">
              {profile.firstName} {profile.lastName}
            </h1>
            <p className="mt-2 text-xs text-zinc-600 font-luxury-sans">
              {age} years old • {profile.city} • {profile.maritalStatus.replaceAll("_", " ")}
            </p>
            <p className="mt-1 text-[11px] text-zinc-500 font-luxury-sans">
              Email: <span className="font-semibold text-zinc-800">{profile.email}</span> • Phone: <span className="font-semibold text-zinc-800">{profile.phoneNumber}</span>
            </p>
          </div>
        </div>
      </header>

      {/* Matchmaking Workspace Layout */}
      <main className="max-w-6xl mx-auto px-6 pt-12">
        <MatchmakingWorkspace
          profileId={profile.id}
          clientEmail={profile.email}
          clientName={`${profile.firstName} ${profile.lastName}`}
          currentJourneyStatus={profile.journey?.status || "NEW"}
          matches={allMatches}
          otherProfiles={otherProfiles}
        />
      </main>
    </div>
  )
}
