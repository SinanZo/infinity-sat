#!/usr/bin/env node
import { drizzle } from "drizzle-orm/mysql2";
import { products, software, categories } from "./drizzle/schema.js";
import * as fs from "fs";

/**
 * Export all database data to SQL file for Vercel deployment
 * This script exports products, software, and categories data
 */

async function exportDatabase() {
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

    // Generate SQL INSERT statements
    let sql = "-- Infinity SAT Database Export\n";
    sql += `-- Generated: ${new Date().toISOString()}\n\n`;

    // Export categories first (they're referenced by products)
    if (allCategories.length > 0) {
      sql += "-- Categories\n";
      sql += "INSERT INTO categories (id, nameEn, nameAr, createdAt, updatedAt) VALUES\n";
      sql += allCategories.map((cat, idx) => {
        const isLast = idx === allCategories.length - 1;
        return `(${cat.id}, ${escapeString(cat.nameEn)}, ${escapeString(cat.nameAr)}, ${escapeDate(cat.createdAt)}, ${escapeDate(cat.updatedAt)})${isLast ? ';' : ','}`;
      }).join('\n');
      sql += "\n\n";
    }

    // Export products
    if (allProducts.length > 0) {
      sql += "-- Products\n";
      sql += "INSERT INTO products (id, nameEn, nameAr, descriptionEn, descriptionAr, price, image, categoryId, featured, featuresEn, featuresAr, createdAt, updatedAt) VALUES\n";
      sql += allProducts.map((prod, idx) => {
        const isLast = idx === allProducts.length - 1;
        return `(${prod.id}, ${escapeString(prod.nameEn)}, ${escapeString(prod.nameAr)}, ${escapeString(prod.descriptionEn)}, ${escapeString(prod.descriptionAr)}, ${prod.price}, ${escapeString(prod.image)}, ${prod.categoryId || 'NULL'}, ${prod.featured ? 1 : 0}, ${escapeString(prod.featuresEn)}, ${escapeString(prod.featuresAr)}, ${escapeDate(prod.createdAt)}, ${escapeDate(prod.updatedAt)})${isLast ? ';' : ','}`;
      }).join('\n');
      sql += "\n\n";
    }

    // Export software
    if (allSoftware.length > 0) {
      sql += "-- Software\n";
      sql += "INSERT INTO software (id, titleEn, titleAr, descriptionEn, descriptionAr, version, fileType, downloadUrl, model, image, createdAt, updatedAt) VALUES\n";
      sql += allSoftware.map((soft, idx) => {
        const isLast = idx === allSoftware.length - 1;
        return `(${soft.id}, ${escapeString(soft.titleEn)}, ${escapeString(soft.titleAr)}, ${escapeString(soft.descriptionEn)}, ${escapeString(soft.descriptionAr)}, ${escapeString(soft.version)}, ${escapeString(soft.fileType)}, ${escapeString(soft.downloadUrl)}, ${escapeString(soft.model)}, ${escapeString(soft.image)}, ${escapeDate(soft.createdAt)}, ${escapeDate(soft.updatedAt)})${isLast ? ';' : ','}`;
      }).join('\n');
      sql += "\n\n";
    }

    // Write to file
    const outputPath = "./infinity_sat_data.sql";
    fs.writeFileSync(outputPath, sql, "utf-8");

    console.log(`\n✅ Database exported successfully!`);
    console.log(`📄 File saved to: ${outputPath}`);
    console.log(`\n📊 Summary:`);
    console.log(`   - ${allCategories.length} categories`);
    console.log(`   - ${allProducts.length} products`);
    console.log(`   - ${allSoftware.length} software items`);
    console.log(`\n🚀 You can now import this SQL file into your Vercel database`);

  } catch (error) {
    console.error("❌ Error exporting database:", error);
    process.exit(1);
  }
}

function escapeString(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''").replace(/\\/g, '\\\\')}'`;
}

function escapeDate(date) {
  if (!date) return 'NOW()';
  return `'${new Date(date).toISOString().slice(0, 19).replace('T', ' ')}'`;
}

exportDatabase();
