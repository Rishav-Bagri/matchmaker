# Matchmaker CRM Dashboard MVP

This is an internal matchmaking CRM tool designed for the TDC team to manage client profiles, track matchmaking journey stages, automatically filter compatible candidates, and run AI-based semantic similarity scoring to identify top matches.

## 🚀 Live Deliverables
* **Repository**: [GitHub Link](https://github.com/Rishav-Bagri/matchmaker.git)
* **Sample Login Credentials**:
  * **Username**: `admin`
  * **Password**: `password123`

---

## 🛠️ Project Write-Up

### 1. Technology Choices
* **Framework**: **Next.js (App Router)** is used for the frontend and API routes. This allows server-rendered customer workspaces, fast page loading, and modular API design.
* **Database & ORM**: **Prisma** with **MongoDB** was selected. MongoDB’s document schema perfectly mirrors the rich, nested fields of matchmaking biodata. Using Prisma allows robust type safety and easy database seed generation.
* **AI & Embedding Library**: **`@xenova/transformers`** running the `Xenova/all-MiniLM-L6-v2` model. This runs completely local, free sentence-transformers inference to convert rich qualitative text (lifestyle, career goals, about me, hobbies) into 384-dimensional dense vectors.
* **Self-Healing Vector Fallback**: A custom deterministic hashing vectorizer acts as an automated fallback. If network failure or bundling issues prevent Xenova from loading, the system falls back to a deterministic hashing projection, keeping the app 100% functional.

### 2. Matching Logic
The matching engine combines database queries with a **4-level prioritized relaxation pipeline** followed by vector similarity ranking:
* **Opposite Gender Check**: Candidates are restricted to the opposite gender.
* **Level 3 (Base Filters)**: Enforces target age range.
* **Level 2 (Lifestyle, Location & Family Compatibility)**:
  * *Relocation City Filter*: If either party is not open to relocate (`openToRelocate === NO`), they *must* share the same city. If both are open, they match across different cities.
  * *Kids Compatibility*: Enforces alignment (e.g., if one says `wantKids === NO`, they will not match with someone who wants kids or has children. `MAYBE` and `YES` can match with candidates having children).
  * *Pet Compatibility*: Cross-references pet openness.
  * *Marital Status*: Checks direct marital status preferences.
* **Level 1 (Physical, Education, Cultural & Demographics)**: Matches height ranges, religion, **Hindu Manglik status compatibility**, vegetarian/non-vegetarian preferences, preferred degree, and minimum income.
* **Level 0 (Strict Social & Habits)**: Matches caste, smoking frequency, and drinking frequency.
* **Ranking (Top 5)**: The filtered pool is ranked in memory using **cosine similarity** of the semantic embeddings. The top 5 matches are returned.

### 3. How AI is Used
* **Semantic Vector Embeddings**: Converts full qualitative text profiles (about me, lifestyle description, career goals, relationship values, family details) into 384-dimensional embeddings. This ranks profiles on soft criteria (like values, aspirations, and interests) rather than just checklist matching.
* **Dynamic Vector Caching**: Embedding generation is cached. During a match query, the engine identifies if any candidate is missing an embedding, generates it on-the-fly, and updates the database (self-healing cache), optimizing performance.

### 4. Assumptions Made
* Matchmaking is binary gender-based (Male matches with Female).
* Candidates who answer "Maybe" or "Yes" to kids or relocation are assumed compatible with partners who are open to these options.
* A client who refuses relocation (`openToRelocate === NO`) requires a partner currently residing in their own city.

---

## 💻 Scripts

* `npm run dev` - start local dev server
* `npm run build` - production build
* `npm run start` - run production server
* `npm run db:generate` - generate Prisma client
* `npm run db:push` - push schema to MongoDB
* `npm run db:seed` - seed the DB with 100 mock profiles
