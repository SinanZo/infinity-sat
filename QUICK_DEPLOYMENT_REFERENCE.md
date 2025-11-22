# ⚡ Quick Deployment Reference Card

**Print this or keep it open while deploying!**

---

## 🔑 Your Credentials & URLs

### **Railway Database**
```
Connection String:
mysql://root:oNuQZjffronGzXoJMUXgellWIDZvkjcE@maglev.proxy.rlwy.net:49772/railway

Dashboard: https://railway.app
Status: ✅ Running with data imported
```

### **GitHub Repository**
```
URL: https://github.com/SinanZo/infinity-sat
Status: ⏳ Needs updated files
```

### **Vercel Project**
```
Dashboard: https://vercel.com/dashboard
Status: ⏳ Needs environment variables & redeploy
```

### **Custom Domain**
```
Domain: infinity-sat.com
DNS Provider: GreenGeeks cPanel
Status: ⏳ Needs DNS records updated
```

---

## 📋 Vercel Environment Variables

Copy-paste these exactly:

```
DATABASE_URL
mysql://root:oNuQZjffronGzXoJMUXgellWIDZvkjcE@maglev.proxy.rlwy.net:49772/railway

JWT_SECRET
infinitysat2025secretkey

VITE_APP_TITLE
Infinity SAT - Modern Satellite Receivers & Software

NODE_ENV
production
```

---

## 🔧 Vercel Build Settings

```
Framework Preset: Other
Build Command: pnpm install && pnpm run build
Output Directory: dist
Install Command: pnpm install
Node.js Version: 22.x
```

---

## 🌐 DNS Records for GreenGeeks

### **Root Domain (@)**
```
Type: A
Name: @ (or infinity-sat.com)
Value: 76.76.21.21
TTL: 14400
```

### **WWW Subdomain**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 14400
```

---

## ✅ Deployment Checklist

- [ ] 1. Upload files to GitHub
- [ ] 2. Add environment variables in Vercel
- [ ] 3. Update build settings in Vercel
- [ ] 4. Trigger Vercel deployment
- [ ] 5. Verify website works on Vercel URL
- [ ] 6. Add custom domain in Vercel
- [ ] 7. Update DNS in GreenGeeks
- [ ] 8. Wait for DNS propagation (1-24 hours)
- [ ] 9. Test https://infinity-sat.com
- [ ] 10. Celebrate! 🎉

---

## 🆘 Quick Troubleshooting

**Build fails?**
→ Check environment variables are set

**Products not showing?**
→ Verify DATABASE_URL is correct

**Domain not working?**
→ Wait 24 hours, check dnschecker.org

**Need help?**
→ Check COMPLETE_DEPLOYMENT_GUIDE.md

---

## 📊 Expected Results

**After deployment:**
- ✅ Website live at infinity-sat.com
- ✅ 51 products displayed
- ✅ 53 software items available
- ✅ Shopping cart working
- ✅ WhatsApp ordering functional
- ✅ SSL certificate active
- ✅ English/Arabic language switching

---

**Estimated Time: 30-45 minutes**

**Good luck! 🚀**
