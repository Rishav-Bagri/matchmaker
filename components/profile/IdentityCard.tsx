import React from 'react';
import { Profile } from '@/src/generated/prisma';

interface IdentityCardProps {
  profile: Profile;
  age: number;
}

export default function IdentityCard({ profile, age }: IdentityCardProps) {
  return (
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
  );
}
