import React from 'react';
import { Profile } from '@/src/generated/prisma';

interface PhysicalLifestyleCardProps {
  profile: Profile;
  heightStr: string;
}

export default function PhysicalLifestyleCard({ profile, heightStr }: PhysicalLifestyleCardProps) {
  return (
    <div className="bg-white border border-[#E5E2DA] rounded-none p-8 space-y-6 shadow-none outline-none ring-0">
      <h3 className="text-xs uppercase tracking-widest text-zinc-900 font-semibold border-b border-[#E5E2DA] pb-2">Physical & Lifestyle</h3>
      
      <div className="grid grid-cols-2 gap-4 text-sm font-light">
        <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
          <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Height</span>
          <span className="text-zinc-800 font-medium tracking-wide">{heightStr}</span>
        </div>
        <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
          <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Weight</span>
          <span className="text-zinc-800 font-medium tracking-wide">
            {profile.weightKg ? `${profile.weightKg} kg` : "Not specified"}
          </span>
        </div>
        <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none col-span-2 flex items-center justify-between shadow-none">
          <div>
            <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Diet Preference</span>
            <span className="text-zinc-900 font-medium tracking-wide capitalize">
              {profile.foodPreference.toLowerCase().replace('_', ' ')}
            </span>
          </div>
        </div>
        <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
          <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Personality</span>
          <span className="text-zinc-800 font-medium tracking-wide capitalize">
            {profile.personalityType.toLowerCase()}
          </span>
        </div>
        <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
          <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Smoking</span>
          <span className="text-zinc-800 font-medium tracking-wide capitalize">
            {profile.smoking.toLowerCase()}
          </span>
        </div>
        <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none col-span-2 shadow-none">
          <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Drinking Status</span>
          <span className="text-zinc-800 font-medium tracking-wide capitalize">
            {profile.drinking.toLowerCase().replace('_', ' ')}
          </span>
        </div>
      </div>
      
      {profile.lifestyle && (
        <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none text-sm font-light shadow-none">
          <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Lifestyle Note</span>
          <p className="text-zinc-800 italic leading-relaxed font-luxury-serif text-base">"{profile.lifestyle}"</p>
        </div>
      )}
    </div>
  );
}
