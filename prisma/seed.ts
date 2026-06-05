import prisma from "../src/lib/prisma";

async function main() {
  console.log("Seeding database...");
  
  const profileCount = await prisma.profile.count();
  if (profileCount === 0) {
    await prisma.profile.create({
      data: {
        firstName: "John",
        lastName: "Doe",
        gender: "MALE",
        dateOfBirth: new Date("1995-05-15"),
        email: "john.doe@example.com",
        phoneNumber: "+1234567890",
        nationality: "American",
        country: "USA",
        city: "New York",
        motherTongue: "English",
        religion: "Christian",
        heightCm: 180,
        collegeName: "NYU",
        degree: "Computer Science",
        highestQualification: "Bachelors",
        currentCompany: "Tech Corp",
        designation: "Software Engineer",
        maritalStatus: "NEVER_MARRIED",
        foodPreference: "VEG",
        smoking: "NO",
        drinking: "OCCASIONALLY",
        personalityType: "INTROVERT",
        manglikStatus: "NO",
        wantKids: "YES",
        openToRelocate: "YES",
        openToPets: "YES",
        wantToWorkAfterMarriage: "YES",
        languagesKnown: ["English", "Spanish"],
        aboutMe: "I am a software engineer looking for a partner.",
        lookingFor: "A kind and caring partner.",
      },
    });
    console.log("Created sample profile.");
  } else {
    console.log("Profiles already exist. Skipping creation.");
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
