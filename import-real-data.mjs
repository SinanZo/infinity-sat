import { drizzle } from "drizzle-orm/mysql2";
import { categories, products, software } from "./drizzle/schema.ts";
import fs from "fs";

const db = drizzle(process.env.DATABASE_URL);

// Read scraped data
const scrapedProducts = JSON.parse(fs.readFileSync('./scraped_products.json', 'utf-8'));
const scrapedSoftware = JSON.parse(fs.readFileSync('./scraped_software.json', 'utf-8'));

console.log(`Found ${scrapedProducts.length} products and ${scrapedSoftware.length} software items`);

async function importData() {
  try {
    console.log('Starting data import...\n');
    
    // Step 1: Clear existing data
    console.log('Clearing existing data...');
    await db.delete(software);
    await db.delete(products);
    await db.delete(categories);
    console.log('✓ Cleared existing data\n');
    
    // Step 2: Create categories
    console.log('Creating categories...');
    const categoryMap = {};
    const categoryData = [
      { nameEn: 'Satellite Receivers', nameAr: 'أجهزة الاستقبال الفضائية', slug: 'satellite-receivers' },
      { nameEn: 'IPTV Receivers', nameAr: 'أجهزة IPTV', slug: 'iptv-receivers' },
      { nameEn: 'Accessories', nameAr: 'الملحقات', slug: 'accessories' },
      { nameEn: 'Receiver Software', nameAr: 'برامج الأجهزة', slug: 'receiver-software' },
      { nameEn: 'APK Applications', nameAr: 'تطبيقات APK', slug: 'apk-applications' }
    ];
    
    for (const cat of categoryData) {
      const [result] = await db.insert(categories).values(cat);
      categoryMap[cat.nameEn] = result.insertId;
      console.log(`✓ Created: ${cat.nameEn}`);
    }
    console.log('');
    
    // Step 3: Import products (hardware only)
    console.log('Importing products...');
    let productCount = 0;
    const receiverCategoryId = categoryMap['Satellite Receivers'];
    const accessoriesCategoryId = categoryMap['Accessories'];
    
    for (const item of scrapedProducts) {
      // Skip software items
      const lowerName = item.name.toLowerCase();
      if (lowerName.includes('software') || lowerName.includes('(software)') || lowerName.includes('apk')) {
        continue;
      }
      
      // Determine category
      let categoryId = receiverCategoryId;
      if (lowerName.includes('lnb') || lowerName.includes('wire') || lowerName.includes('dish') || lowerName.includes('cable')) {
        categoryId = accessoriesCategoryId;
      }
      
      // Parse price
      let price = null;
      if (item.price) {
        const priceMatch = item.price.match(/[\d.]+/);
        if (priceMatch) {
          price = parseFloat(priceMatch[0]);
        }
      }
      
      // Set default price if not available
      if (!price) {
        price = categoryId === accessoriesCategoryId ? 10.00 : 45.00;
      }
      
      await db.insert(products).values({
        nameEn: item.name,
        nameAr: item.name,
        descriptionEn: `${item.name} - High-quality satellite receiver with advanced features`,
        descriptionAr: `${item.name} - جهاز استقبال فضائي عالي الجودة مع ميزات متقدمة`,
        price: price,
        categoryId: categoryId,
        imageUrl: item.image,
        featured: productCount < 6 ? 1 : 0
      });
      
      productCount++;
      if (productCount % 10 === 0) {
        console.log(`✓ Imported ${productCount} products...`);
      }
    }
    console.log(`✓ Total products imported: ${productCount}\n`);
    
    // Step 4: Import software
    console.log('Importing software...');
    let softwareCount = 0;
    const softwareCategoryId = categoryMap['Receiver Software'];
    const apkCategoryId = categoryMap['APK Applications'];
    
    for (const item of scrapedSoftware) {
      const lowerName = item.name.toLowerCase();
      
      // Determine file type and category
      let fileType = 'software';
      let categoryId = softwareCategoryId;
      
      if (lowerName.includes('apk')) {
        fileType = 'apk';
        categoryId = apkCategoryId;
      }
      
      // Extract model name
      let modelName = item.name.replace(/\s*\(Software\)\s*/gi, '').trim();
      modelName = modelName.replace(/\s*APK\s*/gi, '').trim();
      
      await db.insert(software).values({
        titleEn: item.name,
        titleAr: item.name,
        descriptionEn: `Software update for ${modelName} receiver`,
        descriptionAr: `تحديث البرنامج لجهاز ${modelName}`,
        version: '1.0',
        fileType: fileType,
        model: modelName,
        image: item.image,
        downloadUrl: item.url
      });
      
      softwareCount++;
      if (softwareCount % 10 === 0) {
        console.log(`✓ Imported ${softwareCount} software items...`);
      }
    }
    console.log(`✓ Total software imported: ${softwareCount}\n`);
    
    console.log('═══════════════════════════════════════');
    console.log('✅ Import completed successfully!');
    console.log('═══════════════════════════════════════');
    console.log(`Total categories: ${Object.keys(categoryMap).length}`);
    console.log(`Total products: ${productCount}`);
    console.log(`Total software: ${softwareCount}`);
    console.log('═══════════════════════════════════════\n');
    
  } catch (error) {
    console.error('\n❌ Import failed:', error);
    throw error;
  }
}

importData();
