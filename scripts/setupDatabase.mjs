import 'dotenv/config';
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Client } = pg;

async function createAndImport() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected successfully.\n');

    // Create tables
    console.log('Creating tables...');
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        "nameEn" VARCHAR(255) NOT NULL,
        "nameAr" VARCHAR(255) NOT NULL,
        "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✓ Created categories table');

    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        "nameEn" VARCHAR(255) NOT NULL,
        "nameAr" VARCHAR(255) NOT NULL,
        "descriptionEn" TEXT,
        "descriptionAr" TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(500),
        "categoryId" INTEGER NOT NULL,
        featured SMALLINT NOT NULL DEFAULT 0,
        "featuresEn" TEXT,
        "featuresAr" TEXT,
        "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("categoryId") REFERENCES categories(id)
      );
      CREATE INDEX IF NOT EXISTS "products_categoryId_idx" ON products("categoryId");
    `);
    console.log('✓ Created products table');

    await client.query(`
      CREATE TABLE IF NOT EXISTS software (
        id SERIAL PRIMARY KEY,
        "titleEn" VARCHAR(255) NOT NULL,
        "titleAr" VARCHAR(255) NOT NULL,
        "descriptionEn" TEXT,
        "descriptionAr" TEXT,
        version VARCHAR(50),
        "fileType" VARCHAR(50),
        "downloadUrl" VARCHAR(500),
        model VARCHAR(255),
        image VARCHAR(500),
        "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✓ Created software table\n');

    // Import data
    const sqlPath = path.join(__dirname, '..', 'infinity_sat_data.sql');
    console.log(`Reading data from: ${sqlPath}`);
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('Importing data...');
    await client.query(sql);
    console.log('✓ Data imported successfully!\n');

    // Show counts
    const categoriesCount = await client.query('SELECT COUNT(*) FROM categories');
    const productsCount = await client.query('SELECT COUNT(*) FROM products');
    const softwareCount = await client.query('SELECT COUNT(*) FROM software');

    console.log('Database Summary:');
    console.log(`  Categories: ${categoriesCount.rows[0].count}`);
    console.log(`  Products: ${productsCount.rows[0].count}`);
    console.log(`  Software: ${softwareCount.rows[0].count}`);

  } catch (error) {
    console.error('\n❌ Operation failed:', error.message);
    if (error.detail) console.error('Detail:', error.detail);
    process.exit(1);
  } finally {
    await client.end();
    console.log('\nDisconnected.');
  }
}

createAndImport();
