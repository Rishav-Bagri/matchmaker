import { prisma } from "./prisma";

// Generate profile description text for vector embedding
export function generateProfileText(profile: any): string {
  const hobbiesStr = Array.isArray(profile.hobbies) ? profile.hobbies.join(", ") : "";
  return `
    About Me: ${profile.aboutMe || ""}
    Lifestyle: ${profile.lifestyle || ""}
    Family Values: ${profile.familyValues || ""}
    Career Goals: ${profile.careerGoals || ""}
    Relationship Values: ${profile.relationshipValues || ""}
    Future Plans: ${profile.futurePlans || ""}
    Hobbies: ${hobbiesStr}
    Personality: ${profile.personalityType || ""}
  `.trim();
}

// Deterministic hashing fallback vectorizer of dimension 384
export function getDeterministicEmbedding(text: string): number[] {
  const embedding = new Array(384).fill(0);
  const words = text.toLowerCase().split(/\s+/);
  
  for (const word of words) {
    if (!word) continue;
    
    // Simple hash function for the word
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
      hash = (hash << 5) - hash + word.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    
    // Seed a pseudo-random generator with the hash to distribute weight across dimensions
    let seed = Math.abs(hash);
    for (let d = 0; d < 5; d++) {
      // Use LCG to generate 5 dimensions for each word
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      const dim = seed % 384;
      const val = (seed % 2000 - 1000) / 1000; // float between -1 and 1
      embedding[dim] += val;
    }
  }
  
  // Normalize the vector (to unit length)
  let norm = 0;
  for (let i = 0; i < 384; i++) {
    norm += embedding[i] * embedding[i];
  }
  norm = Math.sqrt(norm);
  
  if (norm > 0) {
    for (let i = 0; i < 384; i++) {
      embedding[i] /= norm;
    }
  } else {
    // Fallback if empty text
    for (let i = 0; i < 384; i++) {
      embedding[i] = (i % 2 === 0 ? 1 : -1) / Math.sqrt(384);
    }
  }
  
  return embedding;
}

let extractor: any = null;

// Generate 384-dimension embedding using @xenova/transformers or deterministic fallback
export async function getEmbedding(text: string): Promise<number[]> {
  try {
    // Dynamic import to prevent bundler errors during next build
    const { pipeline } = await import("@xenova/transformers");
    
    if (!extractor) {
      extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    }
    
    const output = await extractor(text, { pooling: "mean", normalize: true });
    return Array.from(output.data);
  } catch (error) {
    console.warn("Failed to generate embedding using @xenova/transformers, using deterministic fallback:", error);
    return getDeterministicEmbedding(text);
  }
}

// Compute cosine similarity between two vectors
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;
  return dotProduct / denominator;
}

// --- Hard Filter Constraints Functions ---

function checkAge(candidate: any, minAge: number | null, maxAge: number | null): boolean {
  const birthDate = new Date(candidate.dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (minAge && age < minAge) return false;
  if (maxAge && age > maxAge) return false;
  return true;
}

function checkHeight(candidate: any, minHeight: number | null, maxHeight: number | null): boolean {
  if (minHeight && candidate.heightCm < minHeight) return false;
  if (maxHeight && candidate.heightCm > maxHeight) return false;
  return true;
}

function checkCityRelocation(candidate: any, target: any, preferredCity: string | null, level: number): boolean {
  // 1. If either party refuses to relocate, they must be in the same city
  if (target.openToRelocate === "NO" || candidate.openToRelocate === "NO") {
    return target.city.toLowerCase() === candidate.city.toLowerCase();
  }
  // 2. Strict city check if preferred city is specified and we are at Level 0
  if (level === 0 && preferredCity) {
    return candidate.city.toLowerCase() === preferredCity.toLowerCase();
  }
  return true;
}

function checkKidsCompatibility(candidate: any, target: any): boolean {
  const targetPref = target.partnerPreference;
  
  // 1. If target explicitly prefers NO children:
  if (targetPref?.wantKids === "NO" || target.wantKids === "NO") {
    if (candidate.haveChildren) return false;
    if (candidate.wantKids === "YES") return false;
  }
  
  // 2. If candidate explicitly wants NO children:
  if (candidate.wantKids === "NO") {
    if (target.haveChildren) return false;
    if (targetPref?.wantKids === "YES" || target.wantKids === "YES") return false;
  }
  
  return true;
}

function checkReligion(candidate: any, religion: string | null): boolean {
  if (religion && candidate.religion.toLowerCase() !== religion.toLowerCase()) return false;
  return true;
}

function checkManglikCompatibility(candidate: any, target: any): boolean {
  // Enforce Manglik status compatibility if both are Hindu
  if (target.religion.toLowerCase() === "hindu" && candidate.religion.toLowerCase() === "hindu") {
    if (target.manglikStatus === "YES" && candidate.manglikStatus === "NO") return false;
    if (target.manglikStatus === "NO" && candidate.manglikStatus === "YES") return false;
  }
  return true;
}

function checkPetsCompatibility(candidate: any, target: any): boolean {
  const targetPref = target.partnerPreference;
  
  // 1. If target explicitly prefers NO pets:
  if (targetPref?.openToPets === "NO" || target.openToPets === "NO") {
    if (candidate.openToPets === "YES") return false;
  }
  
  // 2. If candidate explicitly prefers NO pets:
  if (candidate.openToPets === "NO") {
    if (targetPref?.openToPets === "YES" || target.openToPets === "YES") return false;
  }
  
  return true;
}

function checkDegree(candidate: any, preferredDegree: string | null): boolean {
  if (!preferredDegree) return true;
  const candDegree = (candidate.degree || "").toLowerCase();
  const candQual = (candidate.highestQualification || "").toLowerCase();
  const prefDeg = preferredDegree.toLowerCase();
  return candDegree.includes(prefDeg) || candQual.includes(prefDeg);
}

function checkCaste(candidate: any, caste: string | null): boolean {
  if (caste && (!candidate.caste || candidate.caste.toLowerCase() !== caste.toLowerCase())) return false;
  return true;
}

function checkMaritalStatus(candidate: any, maritalStatus: string | null): boolean {
  if (maritalStatus && candidate.maritalStatus !== maritalStatus) return false;
  return true;
}

function checkHabits(candidate: any, preferredSmoking: string | null, preferredDrinking: string | null): boolean {
  if (preferredSmoking) {
    // Smoking preference hierarchy: NO is strictly NO. OCCASIONALLY accepts NO/OCCASIONALLY.
    if (preferredSmoking === "NO" && candidate.smoking !== "NO") return false;
    if (preferredSmoking === "OCCASIONALLY" && candidate.smoking === "YES") return false;
  }
  if (preferredDrinking) {
    if (preferredDrinking === "NO" && candidate.drinking !== "NO") return false;
    if (preferredDrinking === "OCCASIONALLY" && candidate.drinking === "YES") return false;
  }
  return true;
}

function checkFood(candidate: any, preferredFood: string | null): boolean {
  if (preferredFood) {
    // VEG/JAIN cannot match with NON_VEG
    if ((preferredFood === "VEG" || preferredFood === "JAIN") && candidate.foodPreference === "NON_VEG") return false;
  }
  return true;
}

function checkIncome(candidate: any, minIncome: number | null): boolean {
  if (minIncome && candidate.annualIncome && candidate.annualIncome < minIncome) return false;
  return true;
}

// Multi-stage relaxation candidate filter
function filterCandidates(candidates: any[], target: any, level: number): any[] {
  const p = target.partnerPreference;
  if (!p) return candidates;

  return candidates.filter((c) => {
    // LEVEL 3: Base filters (opposite gender & basic age range)
    if (!checkAge(c, p.minAge, p.maxAge)) return false;
    if (level === 3) return true;

    // LEVEL 2: Level 3 + Relocation + Kids + Pets + Marital Status alignment
    if (!checkCityRelocation(c, target, p.city, level)) return false;
    if (!checkKidsCompatibility(c, target)) return false;
    if (!checkPetsCompatibility(c, target)) return false;
    if (!checkMaritalStatus(c, p.maritalStatus)) return false;
    if (level === 2) return true;

    // LEVEL 1: Level 2 + Height + Religion + Manglik compatibility + Food preference + Degree + Minimum Income
    if (!checkHeight(c, p.minHeightCm, p.maxHeightCm)) return false;
    if (!checkReligion(c, p.religion)) return false;
    if (!checkManglikCompatibility(c, target)) return false;
    if (!checkFood(c, p.foodPreference)) return false;
    if (!checkDegree(c, p.degree)) return false;
    if (!checkIncome(c, p.minIncome)) return false;
    if (level === 1) return true;

    // LEVEL 0 (Strict): All filters including Caste & Habits (Smoking/Drinking)
    if (!checkCaste(c, p.caste)) return false;
    if (!checkHabits(c, p.smoking, p.drinking)) return false;
    return true;
  });
}

// Find top 5 matches using prioritized hard constraint filter levels and similarity ranking
export async function findTopMatches(profileId: string) {
  // 1. Fetch target profile and partner preference
  const targetProfile = await prisma.profile.findUnique({
    where: { id: profileId },
    include: { partnerPreference: true }
  });

  if (!targetProfile) {
    throw new Error(`Profile not found for ID: ${profileId}`);
  }

  // 2. Fetch or generate target profile embedding vector (self-healing)
  let targetEmbedding = targetProfile.embedding;
  if (!targetEmbedding || targetEmbedding.length !== 384) {
    const text = generateProfileText(targetProfile);
    targetEmbedding = await getEmbedding(text);
    // Update in DB
    await prisma.profile.update({
      where: { id: profileId },
      data: { embedding: targetEmbedding }
    });
  }

  // 3. Find existing matches to exclude
  const existingMatches = await prisma.match.findMany({
    where: {
      OR: [
        { profileId },
        { matchedProfileId: profileId }
      ]
    },
    select: {
      profileId: true,
      matchedProfileId: true
    }
  });

  const matchedIds = new Set(
    existingMatches.flatMap(m => [m.profileId, m.matchedProfileId])
  );
  matchedIds.add(profileId); // Exclude self

  // 4. Fetch all candidates of the opposite gender
  const oppositeGender = targetProfile.gender === "MALE" 
    ? "FEMALE" 
    : targetProfile.gender === "FEMALE" 
    ? "MALE" 
    : undefined;

  const rawCandidates = await prisma.profile.findMany({
    where: {
      id: { notIn: Array.from(matchedIds) },
      ...(oppositeGender ? { gender: oppositeGender } : {}),
    }
  });

  // 5. Evaluate matching criteria level-by-level
  let filtered = [];
  let matchingLevel = 0;

  for (let level = 0; level <= 3; level++) {
    matchingLevel = level;
    filtered = filterCandidates(rawCandidates, targetProfile, level);
    if (filtered.length >= 5) {
      break;
    }
  }

  console.log(`Matched ${filtered.length} candidates at relaxation level ${matchingLevel}`);

  // 6. Calculate similarity in memory and sort
  const scoredCandidates = await Promise.all(
    filtered.map(async (candidate) => {
      let candEmbedding = candidate.embedding;
      if (!candEmbedding || candEmbedding.length !== 384) {
        const text = generateProfileText(candidate);
        candEmbedding = await getEmbedding(text);
        
        // Save dynamically to database for performance caching
        prisma.profile.update({
          where: { id: candidate.id },
          data: { embedding: candEmbedding }
        }).catch(err => console.error(`Failed to cache candidate ${candidate.id} embedding:`, err));
      }

      const score = cosineSimilarity(targetEmbedding, candEmbedding);
      return {
        profile: candidate,
        score
      };
    })
  );

  // Sort by score descending
  scoredCandidates.sort((a, b) => b.score - a.score);

  // Return top 5 matches
  return scoredCandidates.slice(0, 5);
}
