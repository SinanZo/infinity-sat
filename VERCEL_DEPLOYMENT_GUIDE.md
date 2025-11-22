# 🚀 Vercel Deployment Guide for Infinity SAT

Complete step-by-step guide to deploy your Infinity SAT website to Vercel with your custom domain `infinity-sat.com`.

---

## 📋 Prerequisites

- GitHub account (free)
- Vercel account (free) - Sign up at https://vercel.com
- Your domain: `infinity-sat.com` (already registered with GreenGeeks)

---

## Step 1: Download Your Project Files

1. In Manus Management UI → **Code** panel
2. Click **"Download All Files"**
3. Extract the ZIP file to your computer

---

## Step 2: Create GitHub Repository

### Option A: Using GitHub Website

1. Go to https://github.com and log in
2. Click the **"+"** icon → **"New repository"**
3. Repository name: `infinity-sat-website`
4. Description: `Infinity SAT - Satellite Receivers & Software E-commerce Website`
5. Choose **Private** (recommended) or Public
6. Click **"Create repository"**

### Option B: Using GitHub Desktop (Easier)

1. Download GitHub Desktop: https://desktop.github.com
2. Install and log in with your GitHub account
3. Click **"Add"** → **"Create New Repository"**
4. Name: `infinity-sat-website`
5. Local path: Choose where you extracted the project
6. Click **"Create Repository"**
7. Click **"Publish repository"**

---

## Step 3: Upload Your Code to GitHub

### If using GitHub Website:

```bash
# Open terminal/command prompt in your project folder
git init
git add .
git commit -m "Initial commit: Infinity SAT website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/infinity-sat-website.git
git push -u origin main
```

### If using GitHub Desktop:

1. Drag your project folder into GitHub Desktop
2. Write commit message: "Initial commit: Infinity SAT website"
3. Click **"Commit to main"**
4. Click **"Push origin"**

---

## Step 4: Deploy to Vercel

1. Go to https://vercel.com and log in
2. Click **"Add New"** → **"Project"**
3. Click **"Import Git Repository"**
4. Select your `infinity-sat-website` repository
5. Vercel will auto-detect it's a Remix app ✅

### Configure Build Settings:

- **Framework Preset**: Remix (auto-detected)
- **Root Directory**: `./` (leave as default)
- **Build Command**: `pnpm run build` (auto-detected)
- **Output Directory**: `build` (auto-detected)

### Add Environment Variables:

Click **"Environment Variables"** and add these (one by one):

```
DATABASE_URL=mysql://username:password@host/database
JWT_SECRET=your-random-secret-key-here
VITE_APP_TITLE=Infinity SAT - Modern Satellite Receivers & Software
```

**Important:** You'll need to set up a MySQL database first (see Step 5)

6. Click **"Deploy"**

Vercel will build and deploy your site in 2-3 minutes! 🎉

---

## Step 5: Set Up Database on PlanetScale (Free MySQL)

Vercel doesn't include a database, so we'll use PlanetScale (free tier):

1. Go to https://planetscale.com and sign up (free)
2. Click **"Create database"**
3. Database name: `infinity-sat-db`
4. Region: Choose closest to your users (e.g., AWS eu-west-1 for Europe/Middle East)
5. Click **"Create database"**

### Get Database Connection String:

1. Click **"Connect"**
2. Select **"Prisma"** (works with Drizzle too)
3. Copy the `DATABASE_URL`
4. It looks like: `mysql://username:password@host/infinity-sat-db?sslaccept=strict`

### Import Your Data:

1. In PlanetScale dashboard, click **"Console"**
2. Click **"Web console"**
3. Copy the contents of `infinity_sat_data.sql` (in your project folder)
4. Paste into the console and run

**OR** use the PlanetScale CLI:

```bash
# Install PlanetScale CLI
brew install planetscale/tap/pscale  # Mac
# Or download from: https://github.com/planetscale/cli

# Login
pscale auth login

# Connect to database
pscale shell infinity-sat-db main

# Import SQL file
SOURCE infinity_sat_data.sql;
```

### Update Vercel Environment Variable:

1. Go back to Vercel → Your Project → **Settings** → **Environment Variables**
2. Find `DATABASE_URL`
3. Update with your PlanetScale connection string
4. Click **"Save"**
5. Go to **Deployments** tab → Click **"..."** on latest deployment → **"Redeploy"**

---

## Step 6: Add Custom Domain (infinity-sat.com)

1. In Vercel → Your Project → **Settings** → **Domains**
2. Click **"Add"**
3. Enter: `infinity-sat.com`
4. Click **"Add"**
5. Vercel will show you DNS records to add

### Update DNS in GreenGeeks:

1. Log in to GreenGeeks cPanel
2. Go to **Zone Editor**
3. Find `infinity-sat.com` zone

**Add/Update these records:**

```
Type: A
Name: @ (or infinity-sat.com)
Value: 76.76.21.21  (Vercel's IP)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Click **"Save"**

### Add www subdomain in Vercel:

1. In Vercel Domains, click **"Add"** again
2. Enter: `www.infinity-sat.com`
3. Click **"Add"**

---

## Step 7: Wait for DNS Propagation

- DNS changes take **1-24 hours** to propagate globally
- Check status at: https://dnschecker.org
- Enter: `infinity-sat.com`

Once propagated:
- ✅ `https://infinity-sat.com` → Your website
- ✅ `https://www.infinity-sat.com` → Your website
- ✅ Automatic SSL certificate
- ✅ Global CDN for fast loading

---

## 🎉 You're Done!

Your Infinity SAT website is now live on Vercel with:

✅ Custom domain: `infinity-sat.com`
✅ Free SSL certificate (HTTPS)
✅ Global CDN
✅ Automatic deployments (push to GitHub = auto-deploy)
✅ All features working (shopping cart, admin dashboard, etc.)

---

## 📝 Important Files Included

- `infinity_sat_data.sql` - Your complete database export (50 products, 53 software, 5 categories)
- `export-database.mjs` - Script to re-export database if needed

---

## 🔄 Future Updates

To update your website:

1. Make changes in Manus (or locally)
2. Push to GitHub
3. Vercel automatically deploys! 🚀

---

## 💡 Alternative Free Database Options

If you prefer not to use PlanetScale:

1. **Supabase** (https://supabase.com) - Free PostgreSQL (need to convert schema)
2. **Railway** (https://railway.app) - Free MySQL with $5/month credit
3. **Neon** (https://neon.tech) - Free PostgreSQL

---

## 🆘 Troubleshooting

### Build fails on Vercel:
- Check environment variables are set correctly
- Ensure `DATABASE_URL` is valid

### Database connection errors:
- Verify PlanetScale database is running
- Check connection string has `?sslaccept=strict`
- Ensure database has been created (run schema migrations)

### Domain not working:
- Wait 24 hours for DNS propagation
- Verify DNS records in GreenGeeks match Vercel's instructions
- Check https://dnschecker.org

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- PlanetScale Docs: https://planetscale.com/docs
- GitHub Docs: https://docs.github.com

---

**Good luck with your deployment! 🚀**
