import React from 'react';
import { Profile } from '@/src/generated/prisma';

interface PreferencesAlignmentCardProps {
  profile: Profile;
}

export default function PreferencesAlignmentCard({ profile }: PreferencesAlignmentCardProps) {
  return (
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
  );
}
