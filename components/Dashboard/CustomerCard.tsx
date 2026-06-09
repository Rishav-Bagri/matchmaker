import Link from "next/link";
import { UserCardProps } from "@/types/CustomerCard";

export default function UserCard({
  id,
  firstName,
  lastName,
  age,
  city,
  maritalStatus,
  designation,
  company,
  status,
  lastActivity,
}: UserCardProps) {
  return (
    <div className="bg-white border border-[#E5E2DA] p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-luxury-sans text-[10px] uppercase tracking-[0.35em] text-zinc-500">
            Active Client
          </p>

          <h2 className="mt-3 font-luxury-serif text-4xl leading-none text-zinc-900">
            {firstName} {lastName}
          </h2>
        </div>

        <div className="shrink-0 border border-zinc-900 px-3 py-1 text-[10px] uppercase tracking-[0.25em] font-luxury-sans">
          {status.replaceAll("_", " ")}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[#E5E2DA] pt-6">
        <div>
          <p className="font-luxury-sans text-[10px] uppercase tracking-[0.25em] text-zinc-500">
            Personal
          </p>

          <p className="mt-2 text-zinc-900">
            {age} • {city}
          </p>

          <p className="text-zinc-700">
            {maritalStatus}
          </p>
        </div>

        <div>
          <p className="font-luxury-sans text-[10px] uppercase tracking-[0.25em] text-zinc-500">
            Career
          </p>

          <p className="mt-2 text-zinc-900">
            {designation}
          </p>

          <p className="text-zinc-700">
            {company}
          </p>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-[#E5E2DA] pt-6">
        <div>
          <p className="font-luxury-sans text-[10px] uppercase tracking-[0.25em] text-zinc-500">
            Last Activity
          </p>

          <p className="mt-1 text-sm text-zinc-900">
            {lastActivity ?? "Recently Active"}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <Link
            href={`/customers/dashboard?id=${id}`}
            className="font-luxury-sans text-xs uppercase tracking-[0.25em] text-zinc-950 font-semibold hover:underline"
          >
            Manage Client →
          </Link>
          <Link
            href={`/profile?id=${id}`}
            target="_blank"
            rel="noreferrer"
            className="font-luxury-sans text-[9px] uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-900 hover:underline"
          >
            Shareable Bio ↗
          </Link>
        </div>
      </div>
    </div>
  );
}