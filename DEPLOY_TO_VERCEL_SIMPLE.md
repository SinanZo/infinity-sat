# 🚀 Simple Vercel Deployment Guide

Follow these steps **exactly** to deploy your Infinity SAT website to Vercel in 20 minutes.

---

## ✅ **Step 1: Download Your Project (2 minutes)**

1. In Manus → Click **Management UI** (right panel)
2. Click **Code** tab
3. Click **"Download All Files"** button
4. Save the ZIP file to your computer
5. **Extract the ZIP file** to a folder (e.g., `infinity-sat`)

---

## ✅ **Step 2: Upload to GitHub (5 minutes)**

You already created the repository at: https://github.com/SinanZo/infinity-sat

### **Option A: GitHub Desktop (Easiest - Recommended)**

1. **Download GitHub Desktop**: https://desktop.github.com
2. Install and log in with your GitHub account
3. Click **File** → **Clone Repository**
4. Select **SinanZo/infinity-sat** from the list
5. Choose where to save it on your computer → Click **Clone**
6. **Copy ALL files** from your extracted project folder into the cloned folder
7. GitHub Desktop will show all the files
8. In the bottom-left:
   - Summary: `Initial commit`
   - Description: `Complete Infinity SAT website with all features`
9. Click **"Commit to main"**
10. Click **"Push origin"** (top button)

✅ **Done!** Your code is now on GitHub!

### **Option B: Upload via GitHub Website (If you don't want to install GitHub Desktop)**

1. Go to https://github.com/SinanZo/infinity-sat
2. Click **"uploading an existing file"** link
3. **Drag your entire extracted folder** into the upload area
4. Wait for upload to complete
5. Scroll down, write commit message: `Initial commit`
6. Click **"Commit changes"**

---

## ✅ **Step 3: Create Free Database on PlanetScale (5 minutes)**

1. Go to https://planetscale.com
2. Click **"Sign up"** (use your GitHub account for easy login)
3. Click **"Create database"**
4. Database name: `infinitysat`
5. Region: **AWS eu-west-1** (Europe - closest to Jordan)
6. Plan: **Hobby** (Free)
7. Click **"Create database"**

### **Get Connection String:**

1. Click **"Connect"** button
2. Framework: Select **"Prisma"**
3. **Copy the DATABASE_URL** (looks like: `mysql://...`)
4. **Save it in a notepad** - you'll need it in Step 4

### **Import Your Data:**

1. Click **"Console"** tab in PlanetScale
2. Click **"Web console"**
3. Open the file `infinity_sat_data.sql` from your downloaded project
4. **Copy ALL the contents**
5. **Paste into the console**
6. Click **"Execute"** or press Ctrl+Enter

✅ You should see: "Query executed successfully"

---

## ✅ **Step 4: Deploy to Vercel (5 minutes)**

1. Go to https://vercel.com
2. Click **"Sign Up"** (use your GitHub account)
3. After login, click **"Add New"** → **"Project"**
4. You'll see **SinanZo/infinity-sat** → Click **"Import"**

### **Configure Project:**

Vercel will auto-detect everything, but verify:
- Framework Preset: **Remix** ✅
- Root Directory: `./` ✅
- Build Command: `pnpm run build` ✅
- Output Directory: `build` ✅

### **Add Environment Variables:**

Click **"Environment Variables"** and add these **3 variables**:

**Variable 1:**
```
Name: DATABASE_URL
Value: [Paste your PlanetScale connection string from Step 3]
```

**Variable 2:**
```
Name: JWT_SECRET  
Value: infinitysat2025secretkey
```

**Variable 3:**
```
Name: VITE_APP_TITLE
Value: Infinity SAT - Modern Satellite Receivers & Software
```

### **Deploy:**

1. Click **"Deploy"**
2. Wait 2-3 minutes ⏳
3. You'll see: **"Congratulations! Your project has been deployed"** 🎉

Click **"Visit"** to see your live website!

---

## ✅ **Step 5: Add Your Custom Domain (3 minutes)**

1. In Vercel, click **"Settings"** tab
2. Click **"Domains"** in the left sidebar
3. Click **"Add"** button
4. Type: `infinity-sat.com`
5. Click **"Add"**

Vercel will show you DNS records like this:

```
Type: A
Name: @
Points to: 76.76.21.21
```

```
Type: CNAME
Name: www
Points to: cname.vercel-dns.com
```

### **Update DNS in GreenGeeks:**

1. Log in to GreenGeeks cPanel
2. Go to **Zone Editor**
3. Find **infinity-sat.com**

**Edit the A record:**
- Click **Edit** on the record with Name: `infinity-sat.com` or `@`
- Change the IP address to: `76.76.21.21`
- Click **Save**

**Edit the www CNAME:**
- Click **Edit** on the record with Name: `www.infinity-sat.com`
- Change the value to: `cname.vercel-dns.com`
- Click **Save**

### **Add www subdomain in Vercel:**

1. Back in Vercel → Domains
2. Click **"Add"** again
3. Type: `www.infinity-sat.com`
4. Click **"Add"**

---

## ✅ **Step 6: Wait for DNS Propagation (1-24 hours)**

- DNS changes take time to spread worldwide
- Usually works within 1-2 hours
- Check status at: https://dnschecker.org (enter `infinity-sat.com`)

---

## 🎉 **You're Done!**

Once DNS propagates, your website will be live at:
- ✅ https://infinity-sat.com
- ✅ https://www.infinity-sat.com

With all features working:
- ✅ 51 products with images
- ✅ 53 software downloads
- ✅ Shopping cart
- ✅ WhatsApp ordering
- ✅ Admin dashboard
- ✅ English/Arabic language
- ✅ Free SSL certificate
- ✅ Global CDN (fast loading worldwide)

---

## 🔄 **Future Updates**

To update your website:

1. Make changes in your local files
2. Push to GitHub (using GitHub Desktop or web upload)
3. Vercel automatically deploys the changes! 🚀

---

## 🆘 **Troubleshooting**

### **Build fails on Vercel:**
- Check that all 3 environment variables are set correctly
- Make sure DATABASE_URL starts with `mysql://`

### **Database errors:**
- Verify you imported `infinity_sat_data.sql` in PlanetScale console
- Check connection string is correct

### **Domain not working:**
- Wait 24 hours for DNS
- Verify DNS records match exactly what Vercel shows
- Use https://dnschecker.org to check propagation

---

## 📞 **Need Help?**

If you get stuck on any step, just let me know which step number and I'll help you!

**Good luck! 🚀**
