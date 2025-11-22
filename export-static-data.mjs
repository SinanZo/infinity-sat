#!/usr/bin/env node
import { drizzle } from "drizzle-orm/mysql2";
import { products, software, categories } from "./drizzle/schema.js";
import * as fs from "fs";
import * as path from "path";

/**
 * Export database data as JSON files for static website
 */

async function exportStaticData() {
  console.log("🔄 Connecting to database...");
  
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL environment variable not set");
    process.exit(1);
  }

  const db = drizzle(process.env.DATABASE_URL);

  try {
    console.log("📦 Fetching all data...");
    
    // Fetch all data
    const allProducts = await db.select().from(products);
    const allSoftware = await db.select().from(software);
    const allCategories = await db.select().from(categories);

    console.log(`✅ Found ${allProducts.length} products`);
    console.log(`✅ Found ${allSoftware.length} software items`);
    console.log(`✅ Found ${allCategories.length} categories`);

    // Create static-site directory
    const staticDir = "./static-site";
    const dataDir = path.join(staticDir, "data");
    
    if (!fs.existsSync(staticDir)) {
      fs.mkdirSync(staticDir);
    }
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    // Write JSON files
    fs.writeFileSync(
      path.join(dataDir, "products.json"),
      JSON.stringify(allProducts, null, 2),
      "utf-8"
    );

    fs.writeFileSync(
      path.join(dataDir, "software.json"),
      JSON.stringify(allSoftware, null, 2),
      "utf-8"
    );

    fs.writeFileSync(
      path.join(dataDir, "categories.json"),
      JSON.stringify(allCategories, null, 2),
      "utf-8"
    );

    console.log(`\n✅ Data exported successfully!`);
    console.log(`📁 Files saved to: ${dataDir}/`);
    console.log(`\n📊 Summary:`);
    console.log(`   - ${allCategories.length} categories`);
    console.log(`   - ${allProducts.length} products`);
    console.log(`   - ${allSoftware.length} software items`);

  } catch (error) {
    console.error("❌ Error exporting data:", error);
    process.exit(1);
  }
}

exportStaticData();
