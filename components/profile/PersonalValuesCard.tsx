import React from 'react';
import { Profile } from '@/src/generated/prisma';

interface PersonalValuesCardProps {
  profile: Profile;
}

export default function PersonalValuesCard({ profile }: PersonalValuesCardProps) {
  if (!profile.relationshipValues && !profile.familyValues && !profile.careerGoals && !profile.futurePlans) {
    return null;
  }

  return (
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
  );
}
