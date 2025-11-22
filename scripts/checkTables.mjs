import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;

async function checkTables() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Connected to database.\n');

    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    if (result.rows.length === 0) {
      console.log('No tables found in the public schema.');
      console.log('\nYou need to create tables using one of these methods:');
      console.log('1. PlanetScale web console (use create_tables.sql)');
      console.log('2. Request CREATE permissions for your role');
      console.log('3. Use a superuser/admin connection');
    } else {
      console.log('Tables in database:');
      result.rows.forEach(row => console.log(`  - ${row.table_name}`));
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.end();
  }
}

checkTables();
