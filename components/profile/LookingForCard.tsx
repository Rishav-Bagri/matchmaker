import React from 'react';
import { PartnerPreference } from '@/src/generated/prisma';

interface LookingForCardProps {
  partnerPreference: PartnerPreference | null;
}

export default function LookingForCard({ partnerPreference }: LookingForCardProps) {
  if (!partnerPreference) {
    return null;
  }

  // Format height in cm/feet/inches if present
  const formatHeight = (cm: number | null) => {
    if (!cm) return null;
    const feet = Math.floor(cm / 30.48);
    const inches = Math.round((cm % 30.48) / 2.54);
    return `${cm} cm (${feet}'${inches}")`;
  };

  const hasPreferences = 
    partnerPreference.minAge || partnerPreference.maxAge ||
    partnerPreference.minHeightCm || partnerPreference.maxHeightCm ||
    partnerPreference.religion || partnerPreference.caste ||
    partnerPreference.maritalStatus || partnerPreference.foodPreference ||
    partnerPreference.city || partnerPreference.degree ||
    partnerPreference.minIncome || partnerPreference.smoking ||
    partnerPreference.drinking || partnerPreference.wantKids ||
    partnerPreference.openToRelocate || partnerPreference.openToPets;

  return (
    <div className="bg-white border border-[#E5E2DA] rounded-none p-8 space-y-6 text-zinc-900 shadow-none outline-none ring-0">
      <h3 className="text-sm uppercase tracking-widest text-zinc-900 font-semibold border-b border-[#E5E2DA] pb-2">Looking For</h3>
      
      {partnerPreference.partnerDescription && (
        <div className=" p-4 border-l-2 border-l-[#E5E2DA] rounded-none text-sm font-light shadow-none">
          <span className="text-zinc-400 block text-[12px] uppercase font-semibold tracking-widest mb-1">Partner Expectations Note</span>
          <p className="text-zinc-800 italic text-xl leading-relaxed font-luxury-serif text-base">"{partnerPreference.partnerDescription}"</p>
        </div>
      )}

      {hasPreferences && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-light">
          {/* Age range */}
          {(partnerPreference.minAge || partnerPreference.maxAge) && (
            <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
              <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Age Range</span>
              <span className="text-zinc-800 font-medium tracking-wide">
                {partnerPreference.minAge || "Any"} - {partnerPreference.maxAge || "Any"} Years
              </span>
            </div>
          )}

          {/* Height range */}
          {(partnerPreference.minHeightCm || partnerPreference.maxHeightCm) && (
            <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
              <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Height Range</span>
              <span className="text-zinc-800 font-medium tracking-wide">
                {partnerPreference.minHeightCm ? formatHeight(partnerPreference.minHeightCm) : "Any"} - {partnerPreference.maxHeightCm ? formatHeight(partnerPreference.maxHeightCm) : "Any"}
              </span>
            </div>
          )}

          {/* Religion & Caste */}
          {(partnerPreference.religion || partnerPreference.caste) && (
            <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
              <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Religion & Caste</span>
              <span className="text-zinc-800 font-medium tracking-wide capitalize">
                {[partnerPreference.religion, partnerPreference.caste].filter(Boolean).join(", ")}
              </span>
            </div>
          )}

          {/* Marital Status */}
          {partnerPreference.maritalStatus && (
            <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
              <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Marital Status</span>
              <span className="text-zinc-800 font-medium tracking-wide capitalize">
                {partnerPreference.maritalStatus.toLowerCase().replace(/_/g, ' ')}
              </span>
            </div>
          )}

          {/* Diet Preference */}
          {partnerPreference.foodPreference && (
            <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
              <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Diet Preference</span>
              <span className="text-zinc-800 font-medium tracking-wide capitalize">
                {partnerPreference.foodPreference.toLowerCase().replace(/_/g, ' ')}
              </span>
            </div>
          )}

          {/* Location */}
          {partnerPreference.city && (
            <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
              <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Preferred Location</span>
              <span className="text-zinc-800 font-medium tracking-wide">{partnerPreference.city}</span>
            </div>
          )}

          {/* Education */}
          {partnerPreference.degree && (
            <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
              <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Preferred Education</span>
              <span className="text-zinc-800 font-medium tracking-wide">{partnerPreference.degree}</span>
            </div>
          )}

          {/* Income */}
          {partnerPreference.minIncome !== null && partnerPreference.minIncome !== undefined && (
            <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
              <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Min Annual Income</span>
              <span className="text-zinc-800 font-medium tracking-wide">
                ₹{partnerPreference.minIncome.toLocaleString("en-IN")}+
              </span>
            </div>
          )}

          {/* Smoking */}
          {partnerPreference.smoking && (
            <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
              <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Smoking habit</span>
              <span className="text-zinc-800 font-medium tracking-wide capitalize">
                {partnerPreference.smoking.toLowerCase()}
              </span>
            </div>
          )}

          {/* Drinking */}
          {partnerPreference.drinking && (
            <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
              <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Drinking habit</span>
              <span className="text-zinc-800 font-medium tracking-wide capitalize">
                {partnerPreference.drinking.toLowerCase().replace(/_/g, ' ')}
              </span>
            </div>
          )}

          {/* Kids Preference */}
          {partnerPreference.wantKids && (
            <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
              <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Kids Preference</span>
              <span className="text-zinc-800 font-medium tracking-wide capitalize">
                {partnerPreference.wantKids.toLowerCase()}
              </span>
            </div>
          )}

          {/* Open to Relocate */}
          {partnerPreference.openToRelocate && (
            <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
              <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Open to Relocate</span>
              <span className="text-zinc-800 font-medium tracking-wide capitalize">
                {partnerPreference.openToRelocate.toLowerCase()}
              </span>
            </div>
          )}

          {/* Open to Pets */}
          {partnerPreference.openToPets && (
            <div className="bg-[#F7F5F0] p-4 border border-[#E5E2DA] rounded-none shadow-none">
              <span className="text-zinc-400 block text-[10px] uppercase font-semibold tracking-widest mb-1">Open to Pets</span>
              <span className="text-zinc-800 font-medium tracking-wide capitalize">
                {partnerPreference.openToPets.toLowerCase()}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
