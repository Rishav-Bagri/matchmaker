import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { sign } from "@/src/lib/jwt"

async function loginAction(formData: FormData) {
  "use server"
  const username = formData.get("username")
  const password = formData.get("password")
  
  if (username === "admin" && password === "password123") {
    const token = sign({ user: "admin", role: "matchmaker" })
    const cookieStore = await cookies()
    cookieStore.set("matchmaker_session", token, {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 day
    })
    redirect("/customers")
  } else {
    redirect("/?error=1")
  }
}

import { verify } from "@/src/lib/jwt"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const error = resolvedSearchParams.error
  const cookieStore = await cookies()
  const session = cookieStore.get("matchmaker_session")

  // Redirect to customers if already authenticated with valid JWT
  if (session && verify(session.value)) {
    redirect("/customers")
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center px-6 antialiased font-luxury-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Montserrat:wght@200;300;400;500;600&display=swap');
        .font-luxury-serif {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .font-luxury-sans {
          font-family: 'Montserrat', Inter, sans-serif;
        }
      `}</style>

      <div className="w-full max-w-md bg-white border border-[#E5E2DA] p-12 space-y-8">
        {/* Brand/Editorial Header */}
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400">
            Internal Portal
          </p>
          <h1 className="mt-3 font-luxury-serif text-4xl font-light text-zinc-900 tracking-wide">
            TDC MATCHMAKER
          </h1>
          <p className="mt-2 text-xs text-zinc-500 uppercase tracking-widest font-light">
            Matchmaking & CRM Workspace
          </p>
        </div>

        {/* Login Form */}
        <form action={loginAction} className="space-y-6 pt-4">
          {error && (
            <div className="border border-red-200 bg-red-50/50 px-4 py-3 text-xs text-red-700 text-center tracking-wide">
              Invalid credentials. Please use admin / password123.
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-semibold">
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              placeholder="e.g., admin"
              defaultValue="admin"
              className="w-full px-4 py-3 bg-[#FBFBFA] border border-[#E5E2DA] text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-800 transition-colors rounded-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              defaultValue="password123"
              className="w-full px-4 py-3 bg-[#FBFBFA] border border-[#E5E2DA] text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-800 transition-colors rounded-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-zinc-900 text-white font-luxury-sans text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-zinc-850 transition-all duration-300 rounded-none cursor-pointer"
          >
            Access Workspace
          </button>
        </form>

        <div className="border-t border-[#E5E2DA] pt-6 text-center">
          <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-400">
            Demo Credentials: admin / password123
          </p>
        </div>
      </div>
    </div>
  )
}
