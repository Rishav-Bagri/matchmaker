import React from 'react';
import { Profile } from '@/src/generated/prisma';

interface FamilyMatchmakingCardProps {
  profile: Profile;
  siblingsStr: string;
}

export default function FamilyMatchmakingCard({ profile, siblingsStr }: FamilyMatchmakingCardProps) {
  return (
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
  );
}
