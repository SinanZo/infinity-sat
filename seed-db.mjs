import { drizzle } from 'drizzle-orm/mysql2';
import { products, software, categories } from './drizzle/schema.js';

const db = drizzle(process.env.DATABASE_URL);

const seedData = async () => {
  console.log('🌱 Starting database seed...');

  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await db.delete(products);
    await db.delete(software);
    await db.delete(categories);

    // Insert categories
    console.log('Inserting categories...');
    const categoryData = [
      {
        nameEn: 'Satellite Receivers',
        nameAr: 'أجهزة الاستقبال الفضائية',
        slug: 'satellite-receivers',
        descriptionEn: 'High-quality satellite receivers for all your entertainment needs',
        descriptionAr: 'أجهزة استقبال فضائية عالية الجودة لجميع احتياجاتك الترفيهية',
      },
      {
        nameEn: 'IPTV Receivers',
        nameAr: 'أجهزة IPTV',
        slug: 'iptv-receivers',
        descriptionEn: 'Modern IPTV receivers with advanced features',
        descriptionAr: 'أجهزة IPTV حديثة مع ميزات متقدمة',
      },
    ];

    const insertedCategories = await db.insert(categories).values(categoryData);
    console.log(`✅ Inserted ${categoryData.length} categories`);

    // Insert products
    console.log('Inserting products...');
    const productData = [
      {
        nameEn: 'Infinity SAT 9970+',
        nameAr: 'إنفينيتي سات 9970+',
        descriptionEn: 'Premium satellite receiver with 4K support, WiFi, and advanced features. Perfect for home entertainment.',
        descriptionAr: 'جهاز استقبال فضائي مميز مع دعم 4K وWiFi وميزات متقدمة. مثالي للترفيه المنزلي.',
        price: 85,
        image: 'https://www.infinity-sat.com/images/products/9970plus.jpg',
        categoryId: 1,
        featured: true,
        stock: 15,
      },
      {
        nameEn: 'Infinity SAT 9970 Pro',
        nameAr: 'إنفينيتي سات 9970 برو',
        descriptionEn: 'Professional grade receiver with enhanced processing power, dual tuner, and premium build quality.',
        descriptionAr: 'جهاز احترافي مع قوة معالجة محسنة، موالف مزدوج وجودة بناء ممتازة.',
        price: 95,
        image: 'https://www.infinity-sat.com/images/products/9970pro.jpg',
        categoryId: 1,
        featured: true,
        stock: 12,
      },
      {
        nameEn: 'Infinity SAT 9977 MAX',
        nameAr: 'إنفينيتي سات 9977 ماكس',
        descriptionEn: 'Maximum performance receiver with 4K Ultra HD, built-in WiFi, Bluetooth, and extensive channel support.',
        descriptionAr: 'جهاز بأقصى أداء مع 4K Ultra HD، WiFi مدمج، Bluetooth ودعم واسع للقنوات.',
        price: 110,
        image: 'https://www.infinity-sat.com/images/products/9977max.jpg',
        categoryId: 1,
        featured: true,
        stock: 10,
      },
      {
        nameEn: 'Infinity SAT 9977 Pro',
        nameAr: 'إنفينيتي سات 9977 برو',
        descriptionEn: 'Professional receiver with advanced features, superior picture quality, and reliable performance.',
        descriptionAr: 'جهاز احترافي مع ميزات متقدمة، جودة صورة فائقة وأداء موثوق.',
        price: 105,
        image: 'https://www.infinity-sat.com/images/products/9977pro.jpg',
        categoryId: 1,
        featured: true,
        stock: 8,
      },
      {
        nameEn: 'Infinity SAT 9988+',
        nameAr: 'إنفينيتي سات 9988+',
        descriptionEn: 'Latest model with cutting-edge technology, 4K HDR support, and comprehensive streaming capabilities.',
        descriptionAr: 'أحدث موديل مع تقنية متطورة، دعم 4K HDR وقدرات بث شاملة.',
        price: 120,
        image: 'https://www.infinity-sat.com/images/products/9988plus.jpg',
        categoryId: 1,
        featured: true,
        stock: 20,
      },
      {
        nameEn: 'Infinity SAT F900',
        nameAr: 'إنفينيتي سات F900',
        descriptionEn: 'Compact and powerful IPTV receiver with full HD support, WiFi connectivity, and user-friendly interface.',
        descriptionAr: 'جهاز IPTV مدمج وقوي مع دعم Full HD، اتصال WiFi وواجهة سهلة الاستخدام.',
        price: 75,
        image: 'https://www.infinity-sat.com/images/products/f900.jpg',
        categoryId: 2,
        featured: false,
        stock: 18,
      },
      {
        nameEn: 'Infinity SAT F900 Pro',
        nameAr: 'إنفينيتي سات F900 برو',
        descriptionEn: 'Professional IPTV receiver with 4K support, advanced streaming features, and premium performance.',
        descriptionAr: 'جهاز IPTV احترافي مع دعم 4K، ميزات بث متقدمة وأداء ممتاز.',
        price: 90,
        image: 'https://www.infinity-sat.com/images/products/f900pro.jpg',
        categoryId: 2,
        featured: false,
        stock: 14,
      },
    ];

    await db.insert(products).values(productData);
    console.log(`✅ Inserted ${productData.length} products`);

    // Insert software
    console.log('Inserting software...');
    const softwareData = [
      {
        titleEn: 'Infinity SAT 9970+ Firmware Update',
        titleAr: 'تحديث برنامج إنفينيتي سات 9970+',
        descriptionEn: 'Latest firmware update for 9970+ with bug fixes and new features',
        descriptionAr: 'أحدث تحديث للبرنامج الثابت لـ 9970+ مع إصلاحات وميزات جديدة',
        model: '9970+',
        version: 'v2.5.1',
        fileType: 'rom',
        fileSize: '45 MB',
        downloadUrl: '#',
        image: 'https://www.infinity-sat.com/images/products/9970plus.jpg',
        releaseDate: new Date('2025-01-15'),
      },
      {
        titleEn: 'Infinity SAT 9970 Pro Software',
        titleAr: 'برنامج إنفينيتي سات 9970 برو',
        descriptionEn: 'Official software update for 9970 Pro with enhanced performance',
        descriptionAr: 'تحديث البرنامج الرسمي لـ 9970 برو مع أداء محسن',
        model: '9970 Pro',
        version: 'v3.0.2',
        fileType: 'software',
        fileSize: '52 MB',
        downloadUrl: '#',
        image: 'https://www.infinity-sat.com/images/products/9970pro.jpg',
        releaseDate: new Date('2025-01-20'),
      },
      {
        titleEn: 'Infinity SAT 9977 MAX Firmware',
        titleAr: 'برنامج إنفينيتي سات 9977 ماكس',
        descriptionEn: 'Complete firmware package for 9977 MAX with all latest updates',
        descriptionAr: 'حزمة البرنامج الثابت الكاملة لـ 9977 ماكس مع جميع التحديثات الأخيرة',
        model: '9977 MAX',
        version: 'v4.1.0',
        fileType: 'rom',
        fileSize: '68 MB',
        downloadUrl: '#',
        image: 'https://www.infinity-sat.com/images/products/9977max.jpg',
        releaseDate: new Date('2025-02-01'),
      },
      {
        titleEn: 'Infinity SAT 9977 Pro Update',
        titleAr: 'تحديث إنفينيتي سات 9977 برو',
        descriptionEn: 'Latest update for 9977 Pro with stability improvements',
        descriptionAr: 'أحدث تحديث لـ 9977 برو مع تحسينات الاستقرار',
        model: '9977 Pro',
        version: 'v3.8.5',
        fileType: 'software',
        fileSize: '58 MB',
        downloadUrl: '#',
        image: 'https://www.infinity-sat.com/images/products/9977pro.jpg',
        releaseDate: new Date('2025-01-25'),
      },
      {
        titleEn: 'Infinity SAT 9988+ Firmware',
        titleAr: 'برنامج إنفينيتي سات 9988+',
        descriptionEn: 'Official firmware for 9988+ with new channel support',
        descriptionAr: 'البرنامج الثابت الرسمي لـ 9988+ مع دعم قنوات جديدة',
        model: '9988+',
        version: 'v5.0.1',
        fileType: 'rom',
        fileSize: '72 MB',
        downloadUrl: '#',
        image: 'https://www.infinity-sat.com/images/products/9988plus.jpg',
        releaseDate: new Date('2025-02-05'),
      },
      {
        titleEn: 'Infinity SAT F900 Software',
        titleAr: 'برنامج إنفينيتي سات F900',
        descriptionEn: 'Software update for F900 IPTV receiver',
        descriptionAr: 'تحديث البرنامج لجهاز F900 IPTV',
        model: 'F900',
        version: 'v2.2.0',
        fileType: 'software',
        fileSize: '38 MB',
        downloadUrl: '#',
        image: 'https://www.infinity-sat.com/images/products/f900.jpg',
        releaseDate: new Date('2025-01-18'),
      },
      {
        titleEn: 'Infinity SAT F900 Pro Firmware',
        titleAr: 'برنامج إنفينيتي سات F900 برو',
        descriptionEn: 'Latest firmware for F900 Pro with enhanced streaming',
        descriptionAr: 'أحدث برنامج ثابت لـ F900 برو مع بث محسن',
        model: 'F900 Pro',
        version: 'v3.1.2',
        fileType: 'rom',
        fileSize: '48 MB',
        downloadUrl: '#',
        image: 'https://www.infinity-sat.com/images/products/f900pro.jpg',
        releaseDate: new Date('2025-02-03'),
      },
      {
        titleEn: 'Infinity SAT Channel List 2025',
        titleAr: 'قائمة قنوات إنفينيتي سات 2025',
        descriptionEn: 'Complete channel list for all Infinity SAT receivers - Updated February 2025',
        descriptionAr: 'قائمة القنوات الكاملة لجميع أجهزة إنفينيتي سات - محدثة فبراير 2025',
        model: 'All Models',
        version: 'v2025.02',
        fileType: 'channels',
        fileSize: '12 MB',
        downloadUrl: '#',
        image: 'https://www.infinity-sat.com/images/logo.png',
        releaseDate: new Date('2025-02-10'),
      },
    ];

    await db.insert(software).values(softwareData);
    console.log(`✅ Inserted ${softwareData.length} software items`);

    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

seedData()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
