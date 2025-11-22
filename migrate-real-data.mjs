import { drizzle } from "drizzle-orm/mysql2";
import { categories, products, software } from "./drizzle/schema.ts";
import { eq } from "drizzle-orm";
import fs from "fs";

const db = drizzle(process.env.DATABASE_URL);

// Read scraped data
const scrapedProducts = JSON.parse(fs.readFileSync('./scraped_products.json', 'utf-8'));
const scrapedSoftware = JSON.parse(fs.readFileSync('./scraped_software.json', 'utf-8'));

console.log(`Found ${scrapedProducts.length} products and ${scrapedSoftware.length} software items`);

// Helper to determine if item is software/APK or hardware receiver
function isSoftwareItem(name) {
  const lowerName = name.toLowerCase();
  return lowerName.includes('software') || 
         lowerName.includes('apk') || 
         lowerName.includes('(software)');
}

// Helper to determine category
function determineCategory(name) {
  const lowerName = name.toLowerCase();
  
  // APKs
  if (lowerName.includes('apk')) {
    return 'APK Applications';
  }
  
  // Software
  if (lowerName.includes('software') || lowerName.includes('(software)')) {
    return 'Receiver Software';
  }
  
  // Hardware accessories
  if (lowerName.includes('lnb') || lowerName.includes('dish') || 
      lowerName.includes('wire') || lowerName.includes('cable')) {
    return 'Accessories';
  }
  
  // Default to receivers
  return 'Satellite Receivers';
}

// Helper to extract model name for software
function extractModelName(softwareName) {
  // Remove (Software) suffix
  let model = softwareName.replace(/\s*\(Software\)\s*/gi, '').trim();
  return model;
}

async function migrate() {
  try {
    console.log('Starting migration...');
    
    // Step 1: Clear existing data
    console.log('Clearing existing data...');
    await db.delete(software);
    await db.delete(products);
    await db.delete(categories);
    
    // Step 2: Create categories
    console.log('Creating categories...');
    const categoryMap = {};
    const categoryNames = [
      { nameEn: 'Satellite Receivers', nameAr: 'أجهزة الاستقبال الفضائية', slug: 'satellite-receivers' },
      { nameEn: 'IPTV Receivers', nameAr: 'أجهزة IPTV', slug: 'iptv-receivers' },
      { nameEn: 'Receiver Software', nameAr: 'برامج الأجهزة', slug: 'receiver-software' },
      { nameEn: 'APK Applications', nameAr: 'تطبيقات APK', slug: 'apk-applications' },
      { nameEn: 'Accessories', nameAr: 'الملحقات', slug: 'accessories' }
    ];
    
    for (const cat of categoryNames) {
      const [result] = await db.insert(categories).values(cat);
      categoryMap[cat.nameEn] = result.insertId;
      console.log(`Created category: ${cat.nameEn} (ID: ${result.insertId})`);
    }
    
    // Step 3: Import hardware products (receivers and accessories)
    console.log('\nImporting hardware products...');
    let productCount = 0;
    
    for (const item of scrapedProducts) {
      // Skip if it's software
      if (isSoftwareItem(item.name)) {
        continue;
      }
      
      const categoryName = determineCategory(item.name);
      const categoryId = categoryMap[categoryName];
      
      // Parse price if available
      let price = null;
      if (item.price) {
        const priceMatch = item.price.match(/[\d.]+/);
        if (priceMatch) {
          price = parseFloat(priceMatch[0]);
        }
      }
      
      await db.insert(products).values({
        nameEn: item.name,
        nameAr: item.name, // Will need manual translation
        descriptionEn: `${item.name} - High-quality satellite receiver`,
        descriptionAr: `${item.name} - جهاز استقبال فضائي عالي الجودة`,
        price: price || 45.00, // Default price if not available
        categoryId: categoryId,
        imageUrl: item.image,
        featured: productCount < 5 // First 5 as featured
      });
      
      productCount++;
      console.log(`Imported product: ${item.name} (Category: ${categoryName})`);
    }
    
    console.log(`\nTotal hardware products imported: ${productCount}`);
    
    // Step 4: Import software and APKs
    console.log('\nImporting software and APKs...');
    let softwareCount = 0;
    
    for (const item of scrapedSoftware) {
      const categoryName = determineCategory(item.name);
      const categoryId = categoryMap[categoryName];
      
      // Determine file type
      let fileType = 'software';
      if (item.name.toLowerCase().includes('apk')) {
        fileType = 'apk';
      }
      
      // Extract model name
      const modelName = extractModelName(item.name);
      
      await db.insert(software).values({
        titleEn: item.name,
        titleAr: item.name, // Will need manual translation
        descriptionEn: `Software update for ${modelName}`,
        descriptionAr: `تحديث البرنامج لـ ${modelName}`,
        version: '1.0',
        fileType: fileType,
        model: modelName,
        image: item.image,
        downloadUrl: item.url
      });
      
      softwareCount++;
      console.log(`Imported software: ${item.name} (Type: ${fileType})`);
    }
    
    console.log(`\nTotal software items imported: ${softwareCount}`);
    console.log('\n✅ Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

migrate();
