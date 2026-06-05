import React from 'react';
import { Profile } from '@/src/generated/prisma';

interface LanguagesHobbiesCardProps {
  profile: Profile;
}

export default function LanguagesHobbiesCard({ profile }: LanguagesHobbiesCardProps) {
  return (
    <div className="bg-white border border-[#E5E2DA] rounded-none p-8 space-y-6 shadow-none outline-none ring-0">
      <div>
        <h3 className="text-xs uppercase tracking-widest text-zinc-900 font-semibold border-b border-[#E5E2DA] pb-2 mb-4">Languages Spoken</h3>
        <div className="flex flex-wrap gap-2">
          {profile.languagesKnown.map((lang) => (
            <span 
              key={lang} 
              className="px-3 py-1.5 bg-[#F7F5F0] border border-[#E5E2DA] text-zinc-800 text-xs font-light uppercase tracking-wider rounded-none shadow-none"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs uppercase tracking-widest text-zinc-900 font-semibold border-b border-[#E5E2DA] pb-2 mb-4">Hobbies & Interests</h3>
        <div className="flex flex-wrap gap-2">
          {profile.hobbies && profile.hobbies.length > 0 ? (
            profile.hobbies.map((hobby) => (
              <span 
                key={hobby} 
                className="px-3 py-1.5 bg-zinc-900 text-white text-xs uppercase tracking-wider rounded-none font-light shadow-none"
              >
                {hobby}
              </span>
            ))
          ) : (
            <span className="text-zinc-400 text-sm font-light">Not specified</span>
          )}
        </div>
      </div>
    </div>
  );
}
