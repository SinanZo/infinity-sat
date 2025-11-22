# ✅ Vercel Deployment Checklist

Print this or keep it open while deploying!

---

## Before You Start

- [ ] Downloaded project files from Manus
- [ ] Extracted ZIP file to a folder
- [ ] Have GitHub account ready
- [ ] Have access to GreenGeeks cPanel

---

## Step 1: GitHub Upload

- [ ] Installed GitHub Desktop OR ready to upload via web
- [ ] Cloned repository: https://github.com/SinanZo/infinity-sat
- [ ] Copied all project files to repository folder
- [ ] Committed with message: "Initial commit"
- [ ] Pushed to GitHub
- [ ] Verified files appear on GitHub website

---

## Step 2: PlanetScale Database

- [ ] Signed up at https://planetscale.com
- [ ] Created database named: `infinitysat`
- [ ] Selected region: AWS eu-west-1
- [ ] Copied DATABASE_URL connection string
- [ ] Saved connection string in notepad
- [ ] Opened Web Console
- [ ] Imported `infinity_sat_data.sql` file
- [ ] Verified "Query executed successfully" message

---

## Step 3: Vercel Deployment

- [ ] Signed up at https://vercel.com with GitHub
- [ ] Clicked "Add New" → "Project"
- [ ] Imported SinanZo/infinity-sat repository
- [ ] Verified Framework: Remix
- [ ] Added environment variable: `DATABASE_URL`
- [ ] Added environment variable: `JWT_SECRET` = `infinitysat2025secretkey`
- [ ] Added environment variable: `VITE_APP_TITLE` = `Infinity SAT - Modern Satellite Receivers & Software`
- [ ] Clicked "Deploy"
- [ ] Waited for deployment to complete
- [ ] Clicked "Visit" and verified website works

---

## Step 4: Custom Domain

### In Vercel:
- [ ] Went to Settings → Domains
- [ ] Added domain: `infinity-sat.com`
- [ ] Noted the DNS records shown
- [ ] Added domain: `www.infinity-sat.com`

### In GreenGeeks cPanel:
- [ ] Logged into cPanel
- [ ] Opened Zone Editor
- [ ] Found infinity-sat.com zone
- [ ] Edited A record: Changed IP to `76.76.21.21`
- [ ] Edited www CNAME: Changed to `cname.vercel-dns.com`
- [ ] Saved changes

---

## Step 5: Verification

- [ ] Waited 1-2 hours for DNS propagation
- [ ] Checked https://dnschecker.org for `infinity-sat.com`
- [ ] Visited https://infinity-sat.com
- [ ] Visited https://www.infinity-sat.com
- [ ] Verified SSL certificate (https) works
- [ ] Tested shopping cart functionality
- [ ] Tested language switching (English/Arabic)
- [ ] Tested WhatsApp ordering
- [ ] Logged into admin dashboard

---

## 🎉 Deployment Complete!

Your website is now live with:
- ✅ Custom domain with SSL
- ✅ All 51 products
- ✅ All 53 software items
- ✅ Shopping cart
- ✅ Admin dashboard
- ✅ Automatic deployments from GitHub

---

## Important URLs to Save

- **Live Website**: https://infinity-sat.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repository**: https://github.com/SinanZo/infinity-sat
- **PlanetScale Database**: https://app.planetscale.com
- **DNS Checker**: https://dnschecker.org

---

## Next Steps After Deployment

- [ ] Test all website features
- [ ] Add more products via admin dashboard
- [ ] Update contact information if needed
- [ ] Share website with customers
- [ ] Set up Google Analytics (optional)
- [ ] Add Facebook Pixel (optional)

---

**Congratulations on your deployment! 🚀**
