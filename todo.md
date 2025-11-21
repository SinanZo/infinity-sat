# Infinity SAT Website - Project TODO

## Core Features

### Database & Backend
- [x] Create products table (name_en, name_ar, description_en, description_ar, price, image, category, features)
- [x] Create software table (title_en, title_ar, description_en, description_ar, version, fileType, downloadUrl, model)
- [x] Create categories table for product categorization
- [x] Implement tRPC procedures for products (list, get, create, update, delete)
- [x] Implement tRPC procedures for software (list, get, create, update, delete)
- [ ] Add image upload functionality with S3 storage

### Frontend Pages
- [ ] Home page with hero section, featured products, and CTAs
- [ ] Products page with grid/table view, filters, and WhatsApp ordering
- [ ] Software page with table view including images, filters, and downloads
- [ ] Contact page with location map, hours, and social media
- [ ] About page with company information

### Multi-Language Support
- [ ] Implement i18n context for En/Ar language switching
- [ ] Add LTR/RTL support for Arabic
- [ ] Create translation files for all content
- [ ] Add language toggle in header

### Admin Dashboard
- [ ] Admin products management (CRUD operations)
- [ ] Admin software management (CRUD operations)
- [ ] Admin settings page
- [ ] Role-based access control (admin only)

### Design & UX
- [ ] Modern, responsive design with Tailwind CSS
- [ ] Dark/Light mode support
- [ ] Mobile-first approach
- [ ] Loading states and error handling
- [ ] SEO optimization (meta tags, structured data)

### Data & Content
- [ ] Seed database with 7 Infinity SAT products
- [ ] Seed database with 8 software/APK items
- [ ] Upload product images to S3
- [ ] Add Infinity SAT logo and branding

### Integration
- [ ] WhatsApp ordering integration (+962796668653)
- [ ] Google Maps embed for location
- [ ] Social media links (Facebook, Instagram, YouTube)
- [ ] Contact form functionality

### Testing & Deployment
- [ ] Test all CRUD operations
- [ ] Test multi-language switching
- [ ] Test responsive design on mobile
- [ ] Create deployment checkpoint
- [ ] Provide deployment instructions
