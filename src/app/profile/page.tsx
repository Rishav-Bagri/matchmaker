import prisma from "@/src/lib/prisma"

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
          
          {/* Main Card */}
          <div className="bg-white border border-[#E5E2DA] rounded-none p-8 relative shadow-none outline-none ring-0">
            
            {/* Profile Picture Placeholder or Image */}
            <div className="relative aspect-square w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-none overflow-hidden flex items-center justify-center mb-6 p-2 shadow-none outline-none ring-0">
              {profile.profilePictures && profile.profilePictures.length > 0 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={profile.profilePictures[0]} 
                  alt={`${profile.firstName}'s photo`}
                  className="w-full h-full object-cover"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${profile.firstName}&scale=110`} 
                  alt={`${profile.firstName}'s avatar`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Profile Core Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <h1 className="text-4xl font-light font-luxury-serif tracking-wide text-zinc-900">
                    {profile.firstName} {profile.lastName}
                  </h1>
                  <span className="border border-zinc-300 text-zinc-600 font-luxury-sans text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-none whitespace-nowrap">
                    {age} Years
                  </span>
                </div>
                <p className="text-zinc-400 text-xs uppercase tracking-widest mt-2 font-medium">
                  {profile.designation} <span className="text-zinc-300">/</span> {profile.currentCompany}
                </p>
              </div>

              <hr className="border-[#E5E2DA]" />

              {/* Identity list */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm font-light">
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Location</span>
                  <span className="text-zinc-800 tracking-wide">{profile.city}, {profile.country}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Gender</span>
                  <span className="text-zinc-800 tracking-wide capitalize">{profile.gender.toLowerCase()}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Mother Tongue</span>
                  <span className="text-zinc-800 tracking-wide">{profile.motherTongue}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Nationality</span>
                  <span className="text-zinc-800 tracking-wide">{profile.nationality}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Religion</span>
                  <span className="text-zinc-900 font-medium tracking-wide">{profile.religion}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Caste</span>
                  <span className="text-zinc-900 font-medium tracking-wide">{profile.caste || "Open"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics / Physical & Lifestyle Details */}
          <div className="bg-white border border-[#E5E2DA] rounded-none p-8 space-y-6 shadow-none outline-none ring-0">
            <h3 className="text-xs uppercase tracking-widest text-zinc-900 font-semibold border-b border-[#E5E2DA] pb-2">Physical & Lifestyle</h3>
            
            <div className="grid grid-cols-2 gap-4 text-sm font-light">
              <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
                <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Height</span>
                <span className="text-zinc-800 font-medium tracking-wide">{heightStr}</span>
              </div>
              <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
                <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Weight</span>
                <span className="text-zinc-800 font-medium tracking-wide">
                  {profile.weightKg ? `${profile.weightKg} kg` : "Not specified"}
                </span>
              </div>
              <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none col-span-2 flex items-center justify-between shadow-none">
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Diet Preference</span>
                  <span className="text-zinc-900 font-medium tracking-wide capitalize">
                    {profile.foodPreference.toLowerCase().replace('_', ' ')}
                  </span>
                </div>
              </div>
              <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
                <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Personality</span>
                <span className="text-zinc-800 font-medium tracking-wide capitalize">
                  {profile.personalityType.toLowerCase()}
                </span>
              </div>
              <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
                <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Smoking</span>
                <span className="text-zinc-800 font-medium tracking-wide capitalize">
                  {profile.smoking.toLowerCase()}
                </span>
              </div>
              <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none col-span-2 shadow-none">
                <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Drinking Status</span>
                <span className="text-zinc-800 font-medium tracking-wide capitalize">
                  {profile.drinking.toLowerCase().replace('_', ' ')}
                </span>
              </div>
            </div>
            
            {profile.lifestyle && (
              <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none text-sm font-light shadow-none">
                <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Lifestyle Note</span>
                <p className="text-zinc-800 italic leading-relaxed font-luxury-serif text-base">"{profile.lifestyle}"</p>
              </div>
            )}
          </div>

          {/* Languages & Hobbies */}
          <div className="bg-white border border-[#E5E2DA] rounded-none p-8 space-y-6 shadow-none outline-none ring-0">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-zinc-900 font-semibold border-b border-[#E5E2DA] pb-2 mb-4">Languages Spoken</h3>
              <div className="flex flex-wrap gap-2">
                {profile.languagesKnown.map((lang) => (
                  <span 
                    key={lang} 
                    className="px-3 py-1.5 bg-[#F7F5F0] border border-[#E5E2DA] text-zinc-800 text-xs font-light uppercase tracking-wider rounded-none shadow-none"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest text-zinc-900 font-semibold border-b border-[#E5E2DA] pb-2 mb-4">Hobbies & Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.hobbies && profile.hobbies.length > 0 ? (
                  profile.hobbies.map((hobby) => (
                    <span 
                      key={hobby} 
                      className="px-3 py-1.5 bg-zinc-900 text-white text-xs uppercase tracking-wider rounded-none font-light shadow-none"
                    >
                      {hobby}
                    </span>
                  ))
                ) : (
                  <span className="text-zinc-400 text-sm font-light">Not specified</span>
                )}
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Columns - Details, Values, Goals */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Statement Cards (About Me, Looking For, etc.) */}
          <div className="bg-white border border-[#E5E2DA] rounded-none p-8 space-y-8 relative overflow-hidden shadow-none outline-none ring-0">
            
            {/* About Me */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm uppercase tracking-widest text-zinc-900 font-semibold border-b border-[#E5E2DA] pb-2 w-full">About Me</h2>
              </div>
              <p className="font-luxury-serif text-2xl font-light italic leading-relaxed text-zinc-800 whitespace-pre-line">
                "{profile.aboutMe}"
              </p>
            </div>

            <hr className="border-[#E5E2DA]" />

            {/* Looking For */}
            <div className="bg-[#F7F5F0] border border-[#E5E2DA] p-6 rounded-none space-y-3 shadow-none">
              <div className="flex items-center gap-2">
                <h2 className="text-xs uppercase tracking-widest text-zinc-900 font-semibold border-b border-[#E5E2DA] pb-2 w-full">Looking For</h2>
              </div>
              <p className="text-zinc-700 text-base leading-relaxed whitespace-pre-line font-light tracking-wide">
                {profile.lookingFor}
              </p>
            </div>

            {/* Optional partner expectations */}
            {profile.partnerExpectations && (
              <>
                <hr className="border-[#E5E2DA]" />
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm uppercase tracking-widest text-zinc-900 font-semibold border-b border-[#E5E2DA] pb-2 w-full">Partner Expectations</h2>
                  </div>
                  <p className="text-zinc-700 text-base leading-relaxed whitespace-pre-line font-light tracking-wide">
                    {profile.partnerExpectations}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Education & Career card */}
          <div className="bg-white border border-[#E5E2DA] rounded-none p-8 space-y-6 shadow-none outline-none ring-0">
            <h3 className="text-sm uppercase tracking-widest text-zinc-900 font-semibold border-b border-[#E5E2DA] pb-2">Education & Career</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Education Box */}
              <div className="bg-[#F7F5F0] p-6 border border-[#E5E2DA] rounded-none flex flex-col justify-between shadow-none">
                <div className="space-y-2">
                  <span className="text-zinc-400 text-[10px] uppercase font-semibold tracking-widest block">Education</span>
                  <h4 className="text-lg font-light font-luxury-serif tracking-wide text-zinc-900">{profile.degree}</h4>
                  <p className="text-zinc-500 text-sm font-light">{profile.collegeName}</p>
                </div>
                <span className="border border-zinc-300 text-zinc-600 text-[10px] uppercase tracking-wider font-medium px-2.5 py-0.5 mt-6 self-start rounded-none">
                  {profile.highestQualification}
                </span>
              </div>

              {/* Career Box */}
              <div className="bg-[#F7F5F0] p-6 border border-[#E5E2DA] rounded-none flex flex-col justify-between shadow-none">
                <div className="space-y-2">
                  <span className="text-zinc-400 text-[10px] uppercase font-semibold tracking-widest block">Employment</span>
                  <h4 className="text-lg font-light font-luxury-serif tracking-wide text-zinc-900">{profile.designation}</h4>
                  <p className="text-zinc-500 text-sm font-light">{profile.currentCompany}</p>
                </div>
                <div className="mt-6 flex items-center justify-between text-sm pt-3 border-t border-[#E5E2DA]">
                  <span className="text-zinc-400 uppercase tracking-widest text-[10px] font-semibold">Annual Income</span>
                  <span className="font-luxury-sans text-zinc-900 font-medium">
                    {profile.annualIncome ? `₹${profile.annualIncome.toLocaleString()}` : "Not specified"}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Personal Values & Life Goals */}
          {(profile.relationshipValues || profile.familyValues || profile.careerGoals || profile.futurePlans) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {profile.relationshipValues && (
                <div className="bg-white border border-[#E5E2DA] rounded-none p-6 space-y-3 shadow-none outline-none ring-0">
                  <h4 className="text-[10px] uppercase font-semibold tracking-widest text-zinc-400 border-b border-[#E5E2DA] pb-2">Relationship Values</h4>
                  <p className="text-zinc-800 text-base font-light leading-relaxed font-luxury-serif italic">"{profile.relationshipValues}"</p>
                </div>
              )}

              {profile.familyValues && (
                <div className="bg-white border border-[#E5E2DA] rounded-none p-6 space-y-3 shadow-none outline-none ring-0">
                  <h4 className="text-[10px] uppercase font-semibold tracking-widest text-zinc-400 border-b border-[#E5E2DA] pb-2">Family Values</h4>
                  <p className="text-zinc-800 text-base font-light leading-relaxed font-luxury-serif italic">"{profile.familyValues}"</p>
                </div>
              )}

              {profile.careerGoals && (
                <div className="bg-white border border-[#E5E2DA] rounded-none p-6 space-y-3 shadow-none outline-none ring-0">
                  <h4 className="text-[10px] uppercase font-semibold tracking-widest text-zinc-400 border-b border-[#E5E2DA] pb-2">Career Goals</h4>
                  <p className="text-zinc-800 text-base font-light leading-relaxed font-luxury-serif italic">"{profile.careerGoals}"</p>
                </div>
              )}

              {profile.futurePlans && (
                <div className="bg-white border border-[#E5E2DA] rounded-none p-6 space-y-3 shadow-none outline-none ring-0">
                  <h4 className="text-[10px] uppercase font-semibold tracking-widest text-zinc-400 border-b border-[#E5E2DA] pb-2">Future Plans</h4>
                  <p className="text-zinc-800 text-base font-light leading-relaxed font-luxury-serif italic">"{profile.futurePlans}"</p>
                </div>
              )}

            </div>
          )}

          {/* Family & Matchmaking */}
          <div className="bg-white border border-[#E5E2DA] rounded-none p-8 space-y-6 text-zinc-900 shadow-none outline-none ring-0">
            <h3 className="text-sm uppercase tracking-widest text-zinc-900 font-semibold border-b border-[#E5E2DA] pb-2">Family & Matchmaking</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-light">
              <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
                <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Marital Status</span>
                <span className="text-zinc-800 font-medium tracking-wide capitalize">
                  {profile.maritalStatus.toLowerCase().replace('_', ' ')}
                </span>
              </div>
              <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
                <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Have Children</span>
                <span className="text-zinc-800 font-medium tracking-wide">
                  {profile.haveChildren ? "Yes" : "No"}
                </span>
              </div>
              <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
                <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Siblings</span>
                <span className="text-zinc-800 font-medium tracking-wide">
                  {siblingsStr}
                </span>
              </div>
              <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
                <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Manglik Status</span>
                <span className="text-zinc-800 font-medium tracking-wide capitalize">
                  {profile.manglikStatus.toLowerCase()}
                </span>
              </div>
              <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
                <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Horoscope</span>
                <span className="text-zinc-800 font-medium tracking-wide">
                  {profile.horoscopeAvailable ? "Available" : "Not Available"}
                </span>
              </div>
              <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none col-span-1 md:col-span-3 shadow-none">
                <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Disability Status</span>
                <span className="text-zinc-800 font-medium tracking-wide">
                  {profile.disabilityStatus || "None"}
                </span>
              </div>
            </div>
          </div>

          {/* Preferences & Alignment */}
          <div className="bg-white border border-[#E5E2DA] rounded-none p-8 space-y-6 shadow-none outline-none ring-0">
            <h3 className="text-sm uppercase tracking-widest text-zinc-900 font-semibold border-b border-[#E5E2DA] pb-2">Preferences & Alignment</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-sm font-light">
              <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none text-zinc-900 shadow-none">
                <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Want Kids</span>
                <span className="text-zinc-800 font-medium tracking-wide capitalize">
                  {profile.wantKids.toLowerCase()}
                </span>
              </div>
              {profile.kidsCountPreference && (profile.wantKids === "YES" || profile.wantKids === "MAYBE") && (
                <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none text-zinc-900 shadow-none">
                  <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Preferred Kids Count</span>
                  <span className="text-zinc-800 font-medium tracking-wide">
                    {profile.kidsCountPreference === "ONE" && "1 Child"}
                    {profile.kidsCountPreference === "TWO_TO_THREE" && "2-3 Children"}
                    {profile.kidsCountPreference === "THREE_OR_MORE" && "3+ Children"}
                    {profile.kidsCountPreference === "OPEN" && "Open to discussion"}
                  </span>
                </div>
              )}
              <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none text-zinc-900 shadow-none">
                <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Open to Relocate</span>
                <span className="text-zinc-800 font-medium tracking-wide capitalize">
                  {profile.openToRelocate.toLowerCase()}
                </span>
              </div>
              <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none text-zinc-900 shadow-none">
                <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Open to Pets</span>
                <span className="text-zinc-800 font-medium tracking-wide capitalize">
                  {profile.openToPets.toLowerCase()}
                </span>
              </div>
              <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none text-zinc-900 shadow-none">
                <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Work After Marriage</span>
                <span className="text-zinc-800 font-medium tracking-wide capitalize">
                  {profile.wantToWorkAfterMarriage.toLowerCase()}
                </span>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  )
}