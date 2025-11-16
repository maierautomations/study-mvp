# 📘 Study MVP – AI-Powered Learning Assistant

Study MVP is a modern AI-enhanced learning platform built with Next.js.  
It helps students learn faster and more efficiently by allowing them to upload their own study materials (PDFs, notes, scripts) and turning them into interactive learning experiences powered by Retrieval-Augmented Generation (RAG).

The goal is to launch a **simple but valuable MVP** for real students — fast, focused, and without overengineering.

---

## 🚀 Vision

Students often struggle with scattered PDFs, messy notes, and unstructured study materials. Most learning time is wasted organizing instead of understanding.

**Study MVP solves this by:**

- Centralizing study materials in one place (organized per module/course)
- Using AI to explain, summarize, and generate learning content
- Building personalized quizzes and flashcards
- Providing a chat experience grounded in the student's own documents
- Tracking progress with motivational gamification (points, progress bars)

The app acts like a smart study coach sitting on top of the student’s actual materials.

---

## ✨ MVP Features

### Core (MVP)

- ✔️ User authentication with **Clerk**
- ✔️ Protected routes (dashboard, modules)
- ✔️ Next.js + Tailwind + shadcn/ui setup
- ✔️ Supabase client configured (database/storage)
- ⏳ Module creation & management
- ⏳ Document uploads + parsing
- ⏳ AI chat using student documents (RAG)
- ⏳ Quiz generator
- ⏳ Basic gamification (points + progress bars)

### Phase 2 (post-MVP)

- Flashcard generator
- Badges, streaks, achievements
- Leaderboards
- Advanced file types (DOCX, PPTX, Notion imports)
- Learning analytics dashboard
- AI-powered summaries per module
- Smart study paths & recommendations

---

## 🧱 Tech Stack

- **Framework:** Next.js (App Router, TypeScript)
- **UI:** Tailwind CSS + shadcn/ui
- **Auth:** Clerk
- **Database & Storage:** Supabase
- **AI / RAG:** Vercel AI SDK
- **Payments:** Stripe (planned)
- **Deployment:** Vercel

---

## 📁 Project Structure (simplified)

````txt
src/
  app/
    layout.tsx            # Global layout + ClerkProvider
    page.tsx              # Landing page
    dashboard/            # Protected user dashboard
    modules/              # Module management
  lib/
    supabaseClient.ts     # Supabase DB client
proxy.ts                  # Clerk middleware / route protection
.env.local                # Environment variables (ignored by git)
README.md

---

## 🔐 Environment Variables

Create a file named .env.local in the project root:

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...

# Stripe (later)
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Local dev URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

⚠️ Do not commit .env.local – keep it out of Git (ensure it is in .gitignore).

---

## 🧑‍💻 Development Setup

Install dependencies:

```bash
npm install
````

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

Production build

```bash
npm run build
```

Deploy to Vercel:

```bash
vercel deploy
```
