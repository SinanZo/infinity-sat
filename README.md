# Infinity SAT - Modern Satellite Receivers & Software

Complete e-commerce website for Infinity SAT, a leading satellite receiver company in Jordan.

## 🌟 Features

- **Product Catalog**: 50+ satellite receivers and accessories with detailed specifications
- **Software Library**: 53 receiver software and APK applications
- **Shopping Cart**: Add multiple products and checkout via WhatsApp
- **Product Comparison**: Compare up to 4 products side-by-side
- **Multi-Language**: Full English/Arabic support with RTL layout
- **Dark/Light Theme**: Automatic theme switching
- **Admin Dashboard**: Complete CMS for managing products, software, and categories
- **Search & Filters**: Advanced filtering by category, price range, and featured status
- **WhatsApp Integration**: Direct ordering via WhatsApp
- **Responsive Design**: Mobile-first, works on all devices

## 🛠️ Tech Stack

- **Framework**: Remix (React-based full-stack framework)
- **Database**: MySQL with Drizzle ORM
- **UI**: Tailwind CSS 4 + shadcn/ui components
- **Language**: TypeScript
- **Testing**: Vitest (55 passing tests)
- **Storage**: S3 for image uploads
- **Authentication**: OAuth with role-based access control

## 📦 Database Contents

- **5 Categories**: Satellite Receivers, IPTV Receivers, Software, etc.
- **50 Products**: All with authentic images from official website
- **53 Software Items**: Receiver software and APK applications

## 🚀 Deployment

See **[VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)** for complete step-by-step instructions to deploy to Vercel with your custom domain.

### Quick Start (Local Development)

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
pnpm db:push

# Import data
pnpm exec tsx export-database.mjs

# Start development server
pnpm run dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
infinity_sat/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React contexts (Language, Theme, Cart, Comparison)
│   │   └── lib/           # Utilities and tRPC client
│   └── public/            # Static assets (logos, hero background)
├── server/                # Backend API and business logic
│   ├── routers.ts         # tRPC procedures
│   ├── db.ts              # Database queries
│   └── _core/             # Framework core (OAuth, context, etc.)
├── drizzle/               # Database schema and migrations
│   └── schema.ts          # Table definitions
├── shared/                # Shared types and constants
└── storage/               # S3 file storage helpers
```

## 🔑 Environment Variables

Required environment variables (auto-injected on Manus, manual setup needed for Vercel):

```
DATABASE_URL=mysql://user:pass@host/db
JWT_SECRET=your-secret-key
VITE_APP_TITLE=Infinity SAT - Modern Satellite Receivers & Software
```

## Seeding & Schema

- **Build the schema bundle (required by some scripts):**

```powershell
pnpm run build:schema
```

- **Seed the database (builds schema first):**

```powershell
pnpm seed
```

- **Run migrations (schema is built automatically via `predb:push`):**

```powershell
pnpm run db:push
```

Note: CI automatically runs `build:schema` before `db:push` and `seed`.

## Deploying to Vercel (one-click)

This repo includes a GitHub Actions workflow to deploy to Vercel on pushes to `main` and via manual dispatch. To enable automatic deployments you need to provide a Vercel token and project identifiers as GitHub repository secrets.

1. Create a Vercel personal token:

```bash
# Install/vercel login if needed
npm i -g vercel
vercel login
vercel tokens create
# Copy the generated token
```

2. Find your Vercel `orgId` and `projectId`:

```bash
vercel projects ls
# or via the Vercel dashboard (Project Settings → General → Project ID)
```

3. Add these three secrets to your GitHub repository (`Settings -> Secrets -> Actions`):
- `VERCEL_TOKEN` = the token you created
- `VERCEL_ORG_ID` = your Vercel organization id
- `VERCEL_PROJECT_ID` = your Vercel project id

Once those secrets are set, pushing to `main` or running the `Deploy to Vercel` workflow manually will build and deploy the site to your Vercel project.


## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

All 55 tests passing ✅

## 📱 Contact Information

- **Phone**: +962 79 666 8653
- **Email**: info@infinity-sat.com
- **WhatsApp**: +962 79 666 8653
- **Location**: Amman, Jordan

## 🌐 Social Media

- Facebook: https://web.facebook.com/profile.php?id=61563891854263
- Instagram: https://www.instagram.com/infinity.sat/
- YouTube: https://www.youtube.com/channel/UCb0YhmGTvpi4m-V5F1F1P8Q

## 📄 License

© 2025 Infinity SAT. All rights reserved.

---

**Powered by [Jawareer](https://jawareer.info)**
