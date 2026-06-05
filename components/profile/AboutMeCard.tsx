import React from 'react';
import { Profile } from '@/src/generated/prisma';

interface AboutMeCardProps {
  profile: Profile;
}

export default function AboutMeCard({ profile }: AboutMeCardProps) {
  return (
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
  );
}
