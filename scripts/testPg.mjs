import 'dotenv/config';
import { Client } from 'pg';

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL is not set in .env');
  process.exit(1);
}

const client = new Client({ connectionString: url });

try {
  console.log('Connecting to database using pg...');
  await client.connect();
  const res = await client.query('SELECT 1 as result');
  console.log('Query result:', res.rows[0]);
  await client.end();
  console.log('Disconnected.');
} catch (err) {
  console.error('Database connection/test failed:');
  console.error(err);
  try {
    await client.end();
  } catch {}
  process.exitCode = 1;
}
