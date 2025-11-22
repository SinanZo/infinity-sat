#!/usr/bin/env node
import { drizzle } from "drizzle-orm/mysql2";
import { products, software, categories } from "./drizzle/schema.js";
import { readFileSync } from "fs";

/**
 * Import data from JSON files to Railway database
 */

const RAILWAY_URL = 'mysql://root:oNuQZjffronGzXoJMUXgellWIDZvkjcE@maglev.proxy.rlwy.net:49772/railway';

async function importData() {
  console.log('🚀 Starting data import to Railway...\n');
  
  try {
    // Connect to Railway database
    console.log('📡 Connecting to Railway MySQL...');
    const db = drizzle(RAILWAY_URL);
    console.log('✅ Connected successfully!\n');

    // Read JSON data
    console.log('📄 Reading data files...');
    const categoriesData = JSON.parse(readFileSync('./static-site/data/categories.json', 'utf-8'));
    const productsData = JSON.parse(readFileSync('./static-site/data/products.json', 'utf-8'));
    const softwareData = JSON.parse(readFileSync('./static-site/data/software.json', 'utf-8'));

    console.log(`✅ Found ${categoriesData.length} categories`);
    console.log(`✅ Found ${productsData.length} products`);
    console.log(`✅ Found ${softwareData.length} software items\n`);

    // Import categories first
    console.log('📦 Importing categories...');
    for (const category of categoriesData) {
      const catData = {
        ...category,
        createdAt: new Date(category.createdAt),
        updatedAt: new Date(category.updatedAt)
      };
      await db.insert(categories).values(catData).onDuplicateKeyUpdate({
        set: { nameEn: category.nameEn, nameAr: category.nameAr }
      });
    }
    console.log('✅ Categories imported!\n');

    // Import products
    console.log('📦 Importing products...');
    for (const product of productsData) {
      const prodData = {
        ...product,
        createdAt: new Date(product.createdAt),
        updatedAt: new Date(product.updatedAt)
      };
      await db.insert(products).values(prodData).onDuplicateKeyUpdate({
        set: {
          nameEn: product.nameEn,
          nameAr: product.nameAr,
          price: product.price,
          image: product.image
        }
      });
    }
    console.log('✅ Products imported!\n');

    // Import software
    console.log('📦 Importing software...');
    for (const soft of softwareData) {
      const softData = {
        ...soft,
        createdAt: new Date(soft.createdAt),
        updatedAt: new Date(soft.updatedAt),
        releaseDate: soft.releaseDate ? new Date(soft.releaseDate) : null
      };
      await db.insert(software).values(softData).onDuplicateKeyUpdate({
        set: {
          titleEn: soft.titleEn,
          titleAr: soft.titleAr,
          version: soft.version,
          downloadUrl: soft.downloadUrl
        }
      });
    }
    console.log('✅ Software imported!\n');

    // Verify
    console.log('🔍 Verifying imported data...');
    const [catCount] = await db.select().from(categories);
    const [prodCount] = await db.select().from(products);
    const [softCount] = await db.select().from(software);

    console.log(`✅ Categories in database: ${catCount.length}`);
    console.log(`✅ Products in database: ${prodCount.length}`);
    console.log(`✅ Software in database: ${softCount.length}`);

    console.log('\n🎉 Data import complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Go to Vercel → Your Project → Settings → Environment Variables');
    console.log('2. Update DATABASE_URL to:');
    console.log('   mysql://root:oNuQZjffronGzXoJMUXgellWIDZvkjcE@maglev.proxy.rlwy.net:49772/railway');
    console.log('3. Redeploy your Vercel project');
    console.log('\n✅ Your website will then be fully functional!');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

importData();
