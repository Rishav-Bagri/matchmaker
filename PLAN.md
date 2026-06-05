1. maybe email krna h show, ya mobile numnenr

2. idea- 
    a. maybe a chat with the ppl
    b. maybe a crushing system, but limited crushes



TODO-

add a edit profile page


Implementation Plan - Edit Profile Page
This plan outlines the implementation of a tabbed edit page at /profile/edit that lets users edit their matrimonial profile.

Proposed Changes
1. Edit Profile Navigation
Add an "Edit Profile" button to the top-right of the profile page src/app/profile/page.tsx.

2. Server Action for Profile Updating (src/app/profile/edit/actions.ts)
Create a Server Action file that exports:

updateProfile(profileId: string, data: Partial<Profile>)
updatePartnerPreference(profileId: string, data: Partial<PartnerPreference>)
3. Modular Form Components (components/profile/forms/)
Create separate client-side form components for each tab to keep logic clean and manageable:

IdentityForm.tsx (Basic personal/demographic fields)
PhysicalLifestyleForm.tsx (Height, weight, diet, drinking/smoking, lifestyle description)
EducationCareerForm.tsx (Qualifications, income, college, current company)
FamilyMatchmakingForm.tsx (Siblings, marital status, children, manglik status, horoscopes)
PreferencesAlignmentForm.tsx (Future plans, relocate, pets, children preferences)
WrittenBioForm.tsx (Large text essays: About Me, Family Values, Career Goals, Future Plans, and Hobbies tags)
LookingForForm.tsx (Partner preference filters and description)
4. Edit Profile Page (src/app/profile/edit/page.tsx)
Create a Next.js Server Component that fetches the active profile and renders the tabbed user interface:

Layout: Left-hand navigation list of sections, right-hand panel showing the active form.
Aesthetic: Premium luxury editorial design with matching #F7F5F0 background, clean input fields, elegant serif headers, and subtle micro-animations/hover states.
Verification Plan
Manual Verification
Access http://localhost:3000/profile?id=6a22530c142e9c1032148bc9 and verify the "Edit Profile" button is present and styled correctly.
Click the button to navigate to /profile/edit?id=....
Try modifying fields in different tabs, click "Save", and verify that a success message is shown.
Go back to the main profile page and verify that the updated values are rendered correctly.