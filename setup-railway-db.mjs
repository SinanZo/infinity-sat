#!/usr/bin/env node
import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';

/**
 * Automatic Railway Database Setup Script
 * This script will:
 * 1. Connect to your Railway MySQL database
 * 2. Create all required tables
 * 3. Import all products, software, and categories
 */

const RAILWAY_URL = 'mysql://root:oNuQZjffronGzXoJMUXgellWIDZvkjcE@maglev.proxy.rlwy.net:49772/railway';

async function setupDatabase() {
  console.log('🚀 Starting Railway Database Setup...\n');
  
  let connection;
  
  try {
    // Connect to database
    console.log('📡 Connecting to Railway MySQL...');
    connection = await mysql.createConnection(RAILWAY_URL);
    console.log('✅ Connected successfully!\n');

    // Read and execute SQL file
    console.log('📄 Reading infinity_sat_data.sql...');
    const sqlContent = readFileSync('./infinity_sat_data.sql', 'utf-8');
    
    // Split SQL into individual statements
    const statements = sqlContent
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`📊 Found ${statements.length} SQL statements to execute\n`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      if (statement.includes('CREATE TABLE') || statement.includes('INSERT INTO')) {
        try {
          await connection.execute(statement);
          
          if (statement.includes('CREATE TABLE')) {
            const tableName = statement.match(/CREATE TABLE `?(\w+)`?/i)?.[1];
            console.log(`✅ Created table: ${tableName}`);
          } else if (statement.includes('INSERT INTO')) {
            const tableName = statement.match(/INSERT INTO `?(\w+)`?/i)?.[1];
            console.log(`✅ Imported data into: ${tableName}`);
          }
        } catch (error) {
          // Ignore "table already exists" errors
          if (!error.message.includes('already exists')) {
            console.error(`❌ Error executing statement ${i + 1}:`, error.message);
          }
        }
      }
    }

    // Verify data
    console.log('\n🔍 Verifying imported data...');
    
    const [categories] = await connection.execute('SELECT COUNT(*) as count FROM categories');
    console.log(`✅ Categories: ${categories[0].count}`);
    
    const [products] = await connection.execute('SELECT COUNT(*) as count FROM products');
    console.log(`✅ Products: ${products[0].count}`);
    
    const [software] = await connection.execute('SELECT COUNT(*) as count FROM software');
    console.log(`✅ Software: ${software[0].count}`);

    console.log('\n🎉 Database setup complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Go to Vercel → Your Project → Settings → Environment Variables');
    console.log('2. Update DATABASE_URL to:');
    console.log('   mysql://root:oNuQZjffronGzXoJMUXgellWIDZvkjcE@maglev.proxy.rlwy.net:49772/railway');
    console.log('3. Redeploy your Vercel project');
    console.log('\n✅ Your website will then be fully functional!');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\nTroubleshooting:');
    console.error('- Check that your Railway database is running');
    console.error('- Verify the connection string is correct');
    console.error('- Make sure infinity_sat_data.sql exists in the same folder');
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();
