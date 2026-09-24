# FreelanceHub — Freelance Marketplace

A modern, full-featured freelance marketplace built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, and **Supabase**.

---

## 🗂 Project Structure

```
freelance-marketplace/
├── app/
│   ├── auth/
│   │   ├── callback/
│   │   │   └── route.ts          # OAuth / magic-link callback
│   │   └── page.tsx              # Login / Sign Up page
│   ├── post-project/
│   │   └── page.tsx              # Post a Project form
│   ├── services/
│   │   └── page.tsx              # Browse Services page
│   ├── globals.css               # Tailwind + global styles
│   ├── layout.tsx                # Root layout (Navbar + Footer)
│   └── page.tsx                  # Homepage
├── components/
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── Navbar.tsx
│   └── ServiceCard.tsx
├── lib/
│   ├── supabase.ts               # Browser Supabase client
│   └── supabase-server.ts        # Server Supabase client (@supabase/ssr)
├── types/
│   ├── database.ts               # Supabase typed schema
│   └── index.ts                  # Domain model types
├── middleware.ts                  # Auth session refresh middleware
├── .env.local                    # Local environment variables
├── .env.local.example            # Example env file
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### 1. Install Node.js

Download and install Node.js (v18 or later) from [https://nodejs.org](https://nodejs.org).

Verify the installation:
```bash
node --version   # e.g. v20.x.x
npm --version    # e.g. 10.x.x
```

### 2. Install Dependencies

Open a terminal in the project folder and run:
```bash
npm install
```

### 3. Set Up Supabase

#### a) Create a Supabase project
1. Go to [https://supabase.com](https://supabase.com) and sign in.
2. Click **New Project** and fill in the details.
3. Wait for the project to be provisioned (~2 minutes).

#### b) Get your credentials
1. Open your project in the Supabase dashboard.
2. Go to **Project Settings → API**.
3. Copy the **Project URL** and the **anon / public** key.

#### c) Configure environment variables
Edit `.env.local` and replace the placeholder with your actual Project URL:
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_ACTUAL_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_FG9NmYpLh0Fq0mir06BUMg_x5YctlCn
```

> **Note:** The anon key is already filled in. Only the URL needs to be updated.

### 4. Create Database Tables

In the Supabase dashboard, go to **SQL Editor** and run the following SQL:

```sql
-- ──────────────────────────────────────────────────────────────────────────────
-- Services table
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE services (
  id              uuid          DEFAULT gen_random_uuid() PRIMARY KEY,
  title           TEXT          NOT NULL,
  description     TEXT          NOT NULL,
  price           DECIMAL(10,2) NOT NULL,
  freelancer_name TEXT          NOT NULL,
  created_at      TIMESTAMPTZ   DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────────────
-- Projects table
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE projects (
  id          uuid          DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT          NOT NULL,
  description TEXT          NOT NULL,
  budget      DECIMAL(10,2) NOT NULL,
  created_at  TIMESTAMPTZ   DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────────────
-- Row Level Security
-- ──────────────────────────────────────────────────────────────────────────────
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read services
CREATE POLICY "Anyone can view services"
  ON services FOR SELECT USING (true);

-- Allow authenticated users to insert services
CREATE POLICY "Authenticated users can insert services"
  ON services FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow anyone to read projects
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT USING (true);

-- Allow anyone to insert projects
CREATE POLICY "Anyone can insert projects"
  ON projects FOR INSERT WITH CHECK (true);
```

#### Optional: Seed sample data
```sql
INSERT INTO services (title, description, price, freelancer_name) VALUES
  ('Professional Logo Design', 'I will create a unique, modern logo for your brand with unlimited revisions until you are satisfied.', 149.00, 'Alice Johnson'),
  ('Full-Stack Web Development', 'Build a complete web application using Next.js, TypeScript, and Supabase with authentication and a beautiful UI.', 1200.00, 'Bob Martinez'),
  ('SEO Content Writing', 'I will write SEO-optimised blog posts and landing page copy that ranks on Google and converts visitors.', 75.00, 'Carol Smith'),
  ('React Native Mobile App', 'Cross-platform iOS and Android app development with React Native, published to both app stores.', 2500.00, 'David Kim'),
  ('UI/UX Design & Prototyping', 'Complete design system, wireframes, and high-fidelity Figma prototypes for your product.', 600.00, 'Emma Wilson'),
  ('Python Data Analysis', 'Analyse your dataset, build visualisations, and deliver actionable insights in a professional report.', 350.00, 'Frank Chen');
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🏗 Building for Production

```bash
npm run build
npm start
```

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `brand-600` | `#2563EB` | Primary buttons, links, accents |
| `brand-700` | `#1D4ED8` | Button hover states |
| `brand-800` | `#1E40AF` | Dark hero gradient start |
| `brand-900` | `#1E3A8A` | Footer background |
| `brand-100` | `#DBEAFE` | Light badges, highlights |
| `brand-50`  | `#EFF6FF` | Subtle backgrounds |

---

## 📦 Tech Stack

| Library | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Supabase](https://supabase.com/) | Database, Auth, Storage |
| [@supabase/ssr](https://supabase.com/docs/guides/auth/server-side/nextjs) | Server-side auth cookie management |
| [lucide-react](https://lucide.dev/) | Icon library |

---

## 🔐 Authentication Flow

1. User signs up → Supabase sends a confirmation email.
2. User clicks the email link → redirected to `/auth/callback`.
3. The route handler exchanges the code for a session (sets auth cookies).
4. Middleware (`middleware.ts`) refreshes the session on every request.
5. Server Components can read the session via `createSupabaseServerClient()`.

---

## 🛡 Security Notes

- **Row Level Security (RLS)** is enabled on all tables.
- The anon key is safe to expose in the browser — RLS enforces data access rules.
- Never expose the **service_role** key on the client side.
- Always run `npm audit` regularly to check for dependency vulnerabilities.

---

## 📝 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

MIT © FreelanceHub
