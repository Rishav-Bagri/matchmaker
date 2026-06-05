import prisma from "@/src/lib/prisma"
import IdentityCard from "@/components/profile/IdentityCard"
import PhysicalLifestyleCard from "@/components/profile/PhysicalLifestyleCard"
import LanguagesHobbiesCard from "@/components/profile/LanguagesHobbiesCard"
import AboutMeCard from "@/components/profile/AboutMeCard"
import EducationCareerCard from "@/components/profile/EducationCareerCard"
import PersonalValuesCard from "@/components/profile/PersonalValuesCard"
import FamilyMatchmakingCard from "@/components/profile/FamilyMatchmakingCard"
import PreferencesAlignmentCard from "@/components/profile/PreferencesAlignmentCard"
import LookingForCard from "@/components/profile/LookingForCard"

export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ id?: string }>
  searchParams: Promise<{ id?: string }>
}) {
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

  // Calculate age
  const birthDate = new Date(profile.dateOfBirth)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  // Format height
  const heightFeet = Math.floor(profile.heightCm / 30.48)
  const heightInches = Math.round((profile.heightCm % 30.48) / 2.54)
  const heightStr = `${profile.heightCm} cm (${heightFeet}'${heightInches}")`

  // Format siblings
  const b = profile.brothers || 0
  const s = profile.sisters || 0
  let siblingsStr = "None"
  if (b > 0 && s > 0) {
    siblingsStr = `${b} ${b === 1 ? 'Brother' : 'Brothers'} & ${s} ${s === 1 ? 'Sister' : 'Sisters'}`
  } else if (b > 0) {
    siblingsStr = `${b} ${b === 1 ? 'Brother' : 'Brothers'}`
  } else if (s > 0) {
    siblingsStr = `${s} ${s === 1 ? 'Sister' : 'Sisters'}`
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
      
      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 pt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column - Core Info */}
        <div className="lg:col-span-1 space-y-8">
          <IdentityCard profile={profile} age={age} />
          <PhysicalLifestyleCard profile={profile} heightStr={heightStr} />
          <LanguagesHobbiesCard profile={profile} />
        </div>

        {/* Right Columns - Details, Values, Goals */}
        <div className="lg:col-span-2 space-y-8">
          <AboutMeCard profile={profile} />
          <EducationCareerCard profile={profile} />
          <PersonalValuesCard profile={profile} />
          <FamilyMatchmakingCard profile={profile} siblingsStr={siblingsStr} />
          <PreferencesAlignmentCard profile={profile} />
          <LookingForCard partnerPreference={profile.partnerPreference} />
        </div>

      </main>
    </div>
  )
}