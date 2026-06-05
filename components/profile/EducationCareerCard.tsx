import React from 'react';
import { Profile } from '@/src/generated/prisma';

interface EducationCareerCardProps {
  profile: Profile;
}

export default function EducationCareerCard({ profile }: EducationCareerCardProps) {
  return (
    <div className="bg-white border border-[#E5E2DA] rounded-none p-8 space-y-6 shadow-none outline-none ring-0">
      <h3 className="text-sm uppercase tracking-widest text-zinc-900 font-semibold border-b border-[#E5E2DA] pb-2">Education & Career</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Education Box */}
        <div className="bg-[#F7F5F0] p-6 border border-[#E5E2DA] rounded-none flex flex-col justify-between shadow-none">
          <div className="space-y-2">
            <span className="text-zinc-400 text-[10px] uppercase font-semibold tracking-widest block">Education</span>
            <h4 className="text-lg font-light font-luxury-serif tracking-wide text-zinc-900">{profile.degree}</h4>
            <p className="text-zinc-500 text-sm font-light">{profile.collegeName}</p>
          </div>
          <span className="border border-zinc-300 text-zinc-600 text-[10px] uppercase tracking-wider font-medium px-2.5 py-0.5 mt-6 self-start rounded-none">
            {profile.highestQualification}
          </span>
        </div>

        {/* Career Box */}
        <div className="bg-[#F7F5F0] p-6 border border-[#E5E2DA] rounded-none flex flex-col justify-between shadow-none">
          <div className="space-y-2">
            <span className="text-zinc-400 text-[10px] uppercase font-semibold tracking-widest block">Employment</span>
            <h4 className="text-lg font-light font-luxury-serif tracking-wide text-zinc-900">{profile.designation}</h4>
            <p className="text-zinc-500 text-sm font-light">{profile.currentCompany}</p>
          </div>
          <div className="mt-6 flex items-center justify-between text-sm pt-3 border-t border-[#E5E2DA]">
            <span className="text-zinc-400 uppercase tracking-widest text-[10px] font-semibold">Annual Income</span>
            <span className="font-luxury-sans text-zinc-900 font-medium">
              {profile.annualIncome ? `₹${profile.annualIncome.toLocaleString()}` : "Not specified"}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
