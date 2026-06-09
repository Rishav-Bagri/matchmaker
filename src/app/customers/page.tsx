import prisma from "@/src/lib/prisma"
import UserCard from "@/components/Dashboard/CustomerCard"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verify } from "@/src/lib/jwt"

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get("matchmaker_session")
  if (!session || !verify(session.value)) {
    redirect("/")
  }

  const profiles = await prisma.profile.findMany({
    include: {
      journey: true,
    },
  })

  const users = profiles.map((profile) => {
    const birthDate = new Date(profile.dateOfBirth)
    const today = new Date()

    let age = today.getFullYear() - birthDate.getFullYear()

    const m = today.getMonth() - birthDate.getMonth()

    if (
      m < 0 ||
      (m === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--
    }

    return {
      id: profile.id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      age,
      city: profile.city,
      maritalStatus: profile.maritalStatus,
      designation: profile.designation,
      company: profile.currentCompany,
      status: profile.journey?.status ?? "NEW",
      lastActivity: profile.journey?.lastContactAt
        ?.toLocaleDateString(),
    }
  })

  return (
    <div className="bg-[#F7F5F0] min-h-screen p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-luxury-serif text-7xl">
          Matchmaking Dashboard
        </h1>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
          {users.map((user) => (
            <UserCard
              key={user.id}
              {...user}
            />
          ))}
        </div>
      </div>
    </div>
  )
}