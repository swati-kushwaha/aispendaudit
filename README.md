# AI Spend Audit

AI Spend Audit is a full-stack AI-powered SaaS application that helps teams analyze their AI tool spending and discover cost optimization opportunities.

Built using Next.js, OpenAI, and Supabase.

---

## Features

- AI-powered spending analysis
- OpenAI-generated optimization summaries
- Dynamic savings calculation
- Interactive charts
- Shareable public audit reports
- Persistent database storage with Supabase
- Responsive modern UI
- Local form persistence

---

## Tech Stack

### Frontend
- Next.js 16
- React
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes
- OpenAI API

### Database
- Supabase PostgreSQL

### Charts
- Recharts

---

## Environment Variables

Create a `.env.local` file:

```env
OPENAI_API_KEY=your_openai_api_key

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url

NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key