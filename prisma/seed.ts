import { PrismaClient, Gender, MaritalStatus, FoodPreference, HabitFrequency, PersonalityType, ManglikStatus, PreferenceChoice, KidsCountPreference, MatchStatus, DateStatus, JourneyStatus } from "../src/generated/prisma"

const prisma = new PrismaClient()

async function main() {
  console.log("Cleaning existing database records...")
  
  // Clean all collections to prevent duplicates
  await prisma.dateRecord.deleteMany({})
  await prisma.match.deleteMany({})
  await prisma.partnerPreference.deleteMany({})
  await prisma.customerJourney.deleteMany({})
  await prisma.profile.deleteMany({})

  console.log("Seeding exactly 5 premium profiles...")

  // --- Profile 1: Riya Sharma (Female) ---
  const riya = await prisma.profile.create({
    data: {
      firstName: "Riya",
      lastName: "Sharma",
      gender: Gender.FEMALE,
      dateOfBirth: new Date("1999-08-15"),
      email: "riya@example.com",
      phoneNumber: "9876543200",
      nationality: "Indian",
      country: "India",
      city: "Bangalore",
      motherTongue: "Hindi",
      religion: "Hindu",
      caste: "Brahmin",
      heightCm: 165,
      weightKg: 58,
      collegeName: "Delhi Technological University",
      degree: "B.Tech Computer Science",
      highestQualification: "Bachelor's Degree",
      currentCompany: "Microsoft",
      designation: "Software Engineer",
      annualIncome: 1800000,
      brothers: 1,
      sisters: 0,
      maritalStatus: MaritalStatus.NEVER_MARRIED,
      haveChildren: false,
      foodPreference: FoodPreference.VEG,
      smoking: HabitFrequency.NO,
      drinking: HabitFrequency.OCCASIONALLY,
      lifestyle: "Active and health-conscious. Enjoys tennis, morning walks, and healthy home-cooked meals.",
      hobbies: ["Reading", "Traveling", "Badminton"],
      personalityType: PersonalityType.AMBIVERT,
      manglikStatus: ManglikStatus.NO,
      horoscopeAvailable: true,
      disabilityStatus: "None",
      wantKids: PreferenceChoice.YES,
      kidsCountPreference: KidsCountPreference.TWO_TO_THREE,
      openToRelocate: PreferenceChoice.YES,
      openToPets: PreferenceChoice.MAYBE,
      wantToWorkAfterMarriage: PreferenceChoice.YES,
      languagesKnown: ["Hindi", "English"],
      aboutMe: "Hi, I am Riya. A software engineer at Microsoft who enjoys learning, traveling, and spending time with my family. I describe myself as progressive yet rooted in traditional values.",
      familyValues: "Moderate, close-knit nuclear family. Respect for elders and family-centric decision making are important to us.",
      careerGoals: "Aims to grow into a technical lead role while maintaining a healthy work-life balance.",
      relationshipValues: "Mutual respect, transparent communication, and shared responsibilities are key in a marriage.",
      futurePlans: "Looking to settle down in Bangalore or a major tech hub with an supportive partner.",
      lookingFor: "Looking for an educated, kind, and ambitious life partner who respects my independence and career.",
      partnerExpectations: "Should be a tech professional or consultant, preferably in Bangalore, with similar lifestyle views.",
      profilePictures: [],
      isVerified: true,
    }
  })

  // Customer Journey for Riya
  await prisma.customerJourney.create({
    data: {
      userId: riya.id,
      status: JourneyStatus.MATCHING,
      assignedTo: "Admin Rishav",
      lastContactAt: new Date(),
    }
  })

  // Partner Preference for Riya
  await prisma.partnerPreference.create({
    data: {
      profileId: riya.id,
      minAge: 25,
      maxAge: 32,
      minHeightCm: 170,
      maxHeightCm: 185,
      religion: "Hindu",
      caste: "Brahmin",
      smoking: HabitFrequency.NO,
      drinking: HabitFrequency.OCCASIONALLY,
      maritalStatus: MaritalStatus.NEVER_MARRIED,
      foodPreference: FoodPreference.VEG,
      city: "Bangalore",
      degree: "B.Tech",
      minIncome: 1500000,
      wantKids: PreferenceChoice.YES,
      openToRelocate: PreferenceChoice.YES,
      openToPets: PreferenceChoice.MAYBE,
      partnerDescription: "Kind, family-oriented, software engineer or professional in Bangalore.",
    }
  })


  // --- Profile 2: Rahul Mehta (Male) ---
  const rahul = await prisma.profile.create({
    data: {
      firstName: "Rahul",
      lastName: "Mehta",
      gender: Gender.MALE,
      dateOfBirth: new Date("1996-05-20"),
      email: "rahul.mehta@example.com",
      phoneNumber: "9876543211",
      nationality: "Indian",
      country: "India",
      city: "Bangalore",
      motherTongue: "Gujarati",
      religion: "Hindu",
      caste: "Shah",
      heightCm: 178,
      weightKg: 74,
      collegeName: "BITS Pilani",
      degree: "M.S. Software Systems",
      highestQualification: "Master's Degree",
      currentCompany: "Google",
      designation: "Senior Software Engineer",
      annualIncome: 3500000,
      brothers: 0,
      sisters: 1,
      maritalStatus: MaritalStatus.NEVER_MARRIED,
      haveChildren: false,
      foodPreference: FoodPreference.VEG,
      smoking: HabitFrequency.NO,
      drinking: HabitFrequency.OCCASIONALLY,
      lifestyle: "Love hiking, filter coffee, reading history, and playing chess on weekends.",
      hobbies: ["Hiking", "Photography", "Chess"],
      personalityType: PersonalityType.INTROVERT,
      manglikStatus: ManglikStatus.NO,
      horoscopeAvailable: true,
      disabilityStatus: "None",
      wantKids: PreferenceChoice.YES,
      kidsCountPreference: KidsCountPreference.TWO_TO_THREE,
      openToRelocate: PreferenceChoice.NO,
      openToPets: PreferenceChoice.YES,
      wantToWorkAfterMarriage: PreferenceChoice.YES,
      languagesKnown: ["Gujarati", "Hindi", "English"],
      aboutMe: "Calm and composed tech professional looking to settle down in Bangalore. I value simple living and continuous growth.",
      familyValues: "Traditional Gujarati business family values mixed with modern sensibilities. Close to my sister.",
      careerGoals: "To transition into technical leadership and startup incubation.",
      relationshipValues: "Deep trust, understanding, and shared life goals.",
      futurePlans: "To stay in Bangalore long-term and establish a comfortable home.",
      lookingFor: "An educated, independent girl with strong family values and an interest in technology.",
      partnerExpectations: "Preferably a working professional in Bangalore who values home and family.",
      profilePictures: [],
      isVerified: true,
    }
  })

  // Customer Journey for Rahul
  await prisma.customerJourney.create({
    data: {
      userId: rahul.id,
      status: JourneyStatus.NEW,
      assignedTo: "Admin Rishav",
      lastContactAt: new Date(),
    }
  })

  // Partner Preference for Rahul
  await prisma.partnerPreference.create({
    data: {
      profileId: rahul.id,
      minAge: 23,
      maxAge: 29,
      minHeightCm: 155,
      maxHeightCm: 172,
      religion: "Hindu",
      caste: "Open",
      smoking: HabitFrequency.NO,
      drinking: HabitFrequency.NO,
      maritalStatus: MaritalStatus.NEVER_MARRIED,
      foodPreference: FoodPreference.VEG,
      city: "Bangalore",
      degree: "B.Tech",
      minIncome: 1000000,
      wantKids: PreferenceChoice.YES,
      openToRelocate: PreferenceChoice.YES,
      openToPets: PreferenceChoice.YES,
      partnerDescription: "Educated, younger female with traditional yet modern outlook.",
    }
  })


  // --- Profile 3: Amit Patel (Male) ---
  const amit = await prisma.profile.create({
    data: {
      firstName: "Amit",
      lastName: "Patel",
      gender: Gender.MALE,
      dateOfBirth: new Date("1995-11-12"),
      email: "amit.patel@example.com",
      phoneNumber: "9876543212",
      nationality: "Indian",
      country: "India",
      city: "Bangalore",
      motherTongue: "Gujarati",
      religion: "Hindu",
      caste: "Patel",
      heightCm: 172,
      weightKg: 70,
      collegeName: "IIM Bangalore",
      degree: "MBA",
      highestQualification: "Master's Degree",
      currentCompany: "Amazon",
      designation: "Product Manager",
      annualIncome: 2800000,
      brothers: 1,
      sisters: 1,
      maritalStatus: MaritalStatus.NEVER_MARRIED,
      haveChildren: false,
      foodPreference: FoodPreference.VEG,
      smoking: HabitFrequency.NO,
      drinking: HabitFrequency.NO,
      lifestyle: "Fitness enthusiast, foodie, and avid traveler. Enjoys running half marathons.",
      hobbies: ["Running", "Cooking", "Traveling"],
      personalityType: PersonalityType.EXTROVERT,
      manglikStatus: ManglikStatus.NO,
      horoscopeAvailable: false,
      disabilityStatus: "None",
      wantKids: PreferenceChoice.YES,
      kidsCountPreference: KidsCountPreference.OPEN,
      openToRelocate: PreferenceChoice.YES,
      openToPets: PreferenceChoice.MAYBE,
      wantToWorkAfterMarriage: PreferenceChoice.YES,
      languagesKnown: ["Gujarati", "Hindi", "English"],
      aboutMe: "Outgoing product guy who loves outdoor fitness and exploring new cuisines. I seek an adventurous companion.",
      familyValues: "Liberal business-oriented family from Ahmedabad, Gujarat.",
      careerGoals: "Aims to start a venture of his own or join a growth-stage company.",
      relationshipValues: "Friendship, intellectual compatibility, and mutual support in personal ventures.",
      futurePlans: "Open to relocating internationally or to Mumbai/Delhi if career opportunities arise.",
      lookingFor: "A warm, career-oriented partner with a positive attitude and a zest for life.",
      partnerExpectations: "An MBA or B.Tech professional, outgoing, and willing to travel.",
      profilePictures: [],
      isVerified: true,
    }
  })

  // Customer Journey for Amit
  await prisma.customerJourney.create({
    data: {
      userId: amit.id,
      status: JourneyStatus.NEW,
      assignedTo: "Admin Rishav",
      lastContactAt: new Date(),
    }
  })

  // Partner Preference for Amit
  await prisma.partnerPreference.create({
    data: {
      profileId: amit.id,
      minAge: 24,
      maxAge: 30,
      minHeightCm: 158,
      maxHeightCm: 170,
      religion: "Hindu",
      caste: "Patel",
      smoking: HabitFrequency.NO,
      drinking: HabitFrequency.OCCASIONALLY,
      maritalStatus: MaritalStatus.NEVER_MARRIED,
      foodPreference: FoodPreference.VEG,
      city: "Bangalore",
      degree: "MBA",
      minIncome: 1200000,
      wantKids: PreferenceChoice.YES,
      openToRelocate: PreferenceChoice.YES,
      openToPets: PreferenceChoice.MAYBE,
      partnerDescription: "Warm, career-oriented professional, open to adventure.",
    }
  })


  // --- Profile 4: Kabir Malhotra (Male) ---
  const kabir = await prisma.profile.create({
    data: {
      firstName: "Kabir",
      lastName: "Malhotra",
      gender: Gender.MALE,
      dateOfBirth: new Date("1994-03-25"),
      email: "kabir.m@example.com",
      phoneNumber: "9876543213",
      nationality: "Indian",
      country: "India",
      city: "Mumbai",
      motherTongue: "Punjabi",
      religion: "Hindu",
      caste: "Khatri",
      heightCm: 182,
      weightKg: 80,
      collegeName: "St. Stephen's College",
      degree: "B.A. Economics",
      highestQualification: "Bachelor's Degree",
      currentCompany: "McKinsey & Co",
      designation: "Engagement Manager",
      annualIncome: 4200000,
      brothers: 0,
      sisters: 0,
      maritalStatus: MaritalStatus.NEVER_MARRIED,
      haveChildren: false,
      foodPreference: FoodPreference.NON_VEG,
      smoking: HabitFrequency.OCCASIONALLY,
      drinking: HabitFrequency.YES,
      lifestyle: "Fast-paced consulting life, enjoying fine dining, jazz, and playing golf.",
      hobbies: ["Golf", "Jazz Music", "Wine Tasting"],
      personalityType: PersonalityType.EXTROVERT,
      manglikStatus: ManglikStatus.YES,
      horoscopeAvailable: true,
      disabilityStatus: "None",
      wantKids: PreferenceChoice.MAYBE,
      kidsCountPreference: KidsCountPreference.OPEN,
      openToRelocate: PreferenceChoice.YES,
      openToPets: PreferenceChoice.NO,
      wantToWorkAfterMarriage: PreferenceChoice.YES,
      languagesKnown: ["Punjabi", "Hindi", "English"],
      aboutMe: "Driven consultant working in Mumbai. I enjoy high-stakes problem-solving, golf, and finding quiet jazz spots in the city.",
      familyValues: "Nuclear progressive family based in Delhi. Father is a retired bureaucrat.",
      careerGoals: "Aims to become a partner at McKinsey or pivot to private equity.",
      relationshipValues: "Intellectual independence, mutual support, and sharing life's finer moments.",
      futurePlans: "May relocate to London or New York for consulting assignments.",
      lookingFor: "An ambitious and smart partner who is independent and supportive of a fast-paced lifestyle.",
      partnerExpectations: "Strong educational background (LSR, Stephen's, IITs, IIMs), career-driven.",
      profilePictures: [],
      isVerified: true,
    }
  })

  // Customer Journey for Kabir
  await prisma.customerJourney.create({
    data: {
      userId: kabir.id,
      status: JourneyStatus.NEW,
      assignedTo: "Admin Rishav",
      lastContactAt: new Date(),
    }
  })

  // Partner Preference for Kabir
  await prisma.partnerPreference.create({
    data: {
      profileId: kabir.id,
      minAge: 25,
      maxAge: 32,
      minHeightCm: 162,
      maxHeightCm: 178,
      religion: "Hindu",
      caste: "Open",
      smoking: HabitFrequency.NO,
      drinking: HabitFrequency.YES,
      maritalStatus: MaritalStatus.NEVER_MARRIED,
      foodPreference: FoodPreference.NON_VEG,
      city: "Mumbai",
      degree: "B.A. Economics",
      minIncome: 1800000,
      wantKids: PreferenceChoice.MAYBE,
      openToRelocate: PreferenceChoice.YES,
      openToPets: PreferenceChoice.NO,
      partnerDescription: "Independent, smart, career-oriented professional in consulting or finance.",
    }
  })


  // --- Profile 5: Divya Sen (Female) ---
  const divya = await prisma.profile.create({
    data: {
      firstName: "Divya",
      lastName: "Sen",
      gender: Gender.FEMALE,
      dateOfBirth: new Date("1997-04-10"),
      email: "divya.sen@example.com",
      phoneNumber: "9876543214",
      nationality: "Indian",
      country: "India",
      city: "Bangalore",
      motherTongue: "Bengali",
      religion: "Hindu",
      caste: "Kayastha",
      heightCm: 160,
      weightKg: 54,
      collegeName: "National Institute of Design (NID)",
      degree: "B.Des Communication Design",
      highestQualification: "Bachelor's Degree",
      currentCompany: "Flipkart",
      designation: "UI/UX Designer",
      annualIncome: 1400000,
      brothers: 0,
      sisters: 1,
      maritalStatus: MaritalStatus.NEVER_MARRIED,
      haveChildren: false,
      foodPreference: FoodPreference.EGGETARIAN,
      smoking: HabitFrequency.NO,
      drinking: HabitFrequency.OCCASIONALLY,
      lifestyle: "Creative and artistic lifestyle. Enjoys painting, playing acoustic guitar, and yoga.",
      hobbies: ["Painting", "Guitar", "Yoga"],
      personalityType: PersonalityType.INTROVERT,
      manglikStatus: ManglikStatus.NO,
      horoscopeAvailable: false,
      disabilityStatus: "None",
      wantKids: PreferenceChoice.MAYBE,
      kidsCountPreference: KidsCountPreference.ONE,
      openToRelocate: PreferenceChoice.YES,
      openToPets: PreferenceChoice.YES,
      wantToWorkAfterMarriage: PreferenceChoice.YES,
      languagesKnown: ["Bengali", "English", "Hindi"],
      aboutMe: "Hi! I am Divya, a product designer based in Bangalore. I love translating ideas into beautiful designs. Seeking a partner who is creative and kind-hearted.",
      familyValues: "Liberal and education-focused Bengali family. Father is a professor and mother is a homemaker.",
      careerGoals: "To build interactive consumer products and eventually direct design departments.",
      relationshipValues: "Empathy, mutual appreciation of arts/crafts, and strong emotional connection.",
      futurePlans: "Planning to stay in Bangalore, but open to other major cities if opportunities arise.",
      lookingFor: "A creative, open-minded professional who appreciates art, tech, and simple family moments.",
      partnerExpectations: "Preferably a developer, designer, or product manager who is mature and understanding.",
      profilePictures: [],
      isVerified: true,
    }
  })

  // Customer Journey for Divya
  await prisma.customerJourney.create({
    data: {
      userId: divya.id,
      status: JourneyStatus.NEW,
      assignedTo: "Admin Rishav",
      lastContactAt: new Date(),
    }
  })

  // Partner Preference for Divya
  await prisma.partnerPreference.create({
    data: {
      profileId: divya.id,
      minAge: 26,
      maxAge: 33,
      minHeightCm: 168,
      maxHeightCm: 184,
      religion: "Hindu",
      caste: "Open",
      smoking: HabitFrequency.NO,
      drinking: HabitFrequency.OCCASIONALLY,
      maritalStatus: MaritalStatus.NEVER_MARRIED,
      foodPreference: FoodPreference.VEG,
      city: "Bangalore",
      degree: "B.Tech",
      minIncome: 1500000,
      wantKids: PreferenceChoice.MAYBE,
      openToRelocate: PreferenceChoice.YES,
      openToPets: PreferenceChoice.YES,
      partnerDescription: "Creative or tech professional who is empathetic, mature, and likes pets.",
    }
  })


  // --- Seed Match & Date Records between Riya, Divya and the candidates ---

  // 1. Riya and Rahul Match (Accepted)
  const match1_2 = await prisma.match.create({
    data: {
      profileId: riya.id,
      matchedProfileId: rahul.id,
      status: MatchStatus.ACCEPTED,
    }
  })

  await prisma.dateRecord.createMany({
    data: [
      {
        matchId: match1_2.id,
        dateScheduledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        status: DateStatus.COMPLETED,
        notes: "Had a great coffee date at Blue Tokai. Found common interest in traveling. Rahul was very polite and family-oriented.",
      },
      {
        matchId: match1_2.id,
        dateScheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        status: DateStatus.SCHEDULED,
        notes: "Second date scheduled for dinner at Olive Beach, Bangalore. Looking forward to discussing career alignments.",
      }
    ]
  })

  // 2. Riya and Amit Match (Interest Expressed)
  await prisma.match.create({
    data: {
      profileId: riya.id,
      matchedProfileId: amit.id,
      status: MatchStatus.INTEREST_EXPRESSED,
    }
  })

  // 3. Riya and Kabir Match (Declined)
  const match1_4 = await prisma.match.create({
    data: {
      profileId: riya.id,
      matchedProfileId: kabir.id,
      status: MatchStatus.DECLINED,
    }
  })

  await prisma.dateRecord.create({
    data: {
      matchId: match1_4.id,
      dateScheduledAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
      status: DateStatus.COMPLETED,
      notes: "Met briefly at Third Wave Coffee. Kabir seemed too focused on work. Riya felt they lacked personal values alignment.",
    }
  })

  // 4. Divya and Amit Match (Proposed)
  const match5_3 = await prisma.match.create({
    data: {
      profileId: divya.id,
      matchedProfileId: amit.id,
      status: MatchStatus.PROPOSED,
    }
  })

  await prisma.dateRecord.create({
    data: {
      matchId: match5_3.id,
      dateScheduledAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
      status: DateStatus.SCHEDULED,
      notes: "Initial introductory video call scheduled to discuss lifestyle preferences.",
    }
  })

  console.log("Database successfully seeded with exactly 5 profiles and completely populated tables!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
