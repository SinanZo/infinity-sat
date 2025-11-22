import { drizzle } from "drizzle-orm/mysql2";
import { products, software } from "./drizzle/schema.ts";
import { eq } from "drizzle-orm";
import fs from "fs";

const db = drizzle(process.env.DATABASE_URL);

// Read scraped data
const scrapedProducts = JSON.parse(fs.readFileSync('./scraped_products.json', 'utf-8'));
const scrapedSoftware = JSON.parse(fs.readFileSync('./scraped_software.json', 'utf-8'));

console.log(`Found ${scrapedProducts.length} products and ${scrapedSoftware.length} software items in scraped data\n`);

async function updateImages() {
  try {
    console.log('Starting image update...\n');
    
    // Step 1: Get all products from database
    console.log('Fetching products from database...');
    const dbProducts = await db.select().from(products);
    console.log(`Found ${dbProducts.length} products in database\n`);
    
    // Step 2: Update product images
    console.log('Updating product images...');
    let productUpdates = 0;
    
    for (const dbProduct of dbProducts) {
      // Find matching scraped product by name
      const scrapedProduct = scrapedProducts.find(p => {
        const scrapedName = p.name.replace(/\s*\(Software\)\s*/gi, '').trim();
        const dbName = dbProduct.nameEn.trim();
        return scrapedName.toLowerCase() === dbName.toLowerCase() ||
               scrapedName.toLowerCase().includes(dbName.toLowerCase()) ||
               dbName.toLowerCase().includes(scrapedName.toLowerCase());
      });
      
      if (scrapedProduct && scrapedProduct.image) {
        await db.update(products)
          .set({ image: scrapedProduct.image })
          .where(eq(products.id, dbProduct.id));
        
        productUpdates++;
        console.log(`✓ Updated: ${dbProduct.nameEn} -> ${scrapedProduct.image.substring(0, 60)}...`);
      } else {
        console.log(`✗ No image found for: ${dbProduct.nameEn}`);
      }
    }
    
    console.log(`\n✓ Updated ${productUpdates} product images\n`);
    
    // Step 3: Get all software from database
    console.log('Fetching software from database...');
    const dbSoftware = await db.select().from(software);
    console.log(`Found ${dbSoftware.length} software items in database\n`);
    
    // Step 4: Update software images
    console.log('Updating software images...');
    let softwareUpdates = 0;
    
    for (const dbSoft of dbSoftware) {
      // Find matching scraped software by name
      const scrapedSoft = scrapedSoftware.find(s => {
        const scrapedName = s.name.trim();
        const dbName = dbSoft.titleEn.trim();
        return scrapedName.toLowerCase() === dbName.toLowerCase() ||
               scrapedName.toLowerCase().includes(dbName.toLowerCase()) ||
               dbName.toLowerCase().includes(scrapedName.toLowerCase());
      });
      
      if (scrapedSoft && scrapedSoft.image) {
        await db.update(software)
          .set({ image: scrapedSoft.image })
          .where(eq(software.id, dbSoft.id));
        
        softwareUpdates++;
        console.log(`✓ Updated: ${dbSoft.titleEn} -> ${scrapedSoft.image.substring(0, 60)}...`);
      } else {
        console.log(`✗ No image found for: ${dbSoft.titleEn}`);
      }
    }
    
    console.log(`\n✓ Updated ${softwareUpdates} software images\n`);
    
    console.log('═══════════════════════════════════════');
    console.log('✅ Image update completed successfully!');
    console.log('═══════════════════════════════════════');
    console.log(`Product images updated: ${productUpdates}/${dbProducts.length}`);
    console.log(`Software images updated: ${softwareUpdates}/${dbSoftware.length}`);
    console.log('═══════════════════════════════════════\n');
    
  } catch (error) {
    console.error('\n❌ Update failed:', error);
    throw error;
  }
}

updateImages();
