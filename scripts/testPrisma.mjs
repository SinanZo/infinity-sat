import 'dotenv/config';
let PrismaClient;

try {
  // Prefer the generated client in the repo (works with ts-node)
  const gen = await import('../generated/prisma/client.ts');
  PrismaClient = gen.PrismaClient ?? gen.default?.PrismaClient ?? gen.default;
  console.log('Using generated client from ./generated/prisma');
} catch (err) {
  // Fallback to @prisma/client
  try {
    const pkg = await import('@prisma/client');
    PrismaClient = pkg.PrismaClient ?? pkg.default?.PrismaClient ?? pkg.default;
    console.log('Using @prisma/client package');
  } catch (err2) {
    console.error('Failed to import Prisma client from generated client and @prisma/client:');
    console.error(err2 || err);
    process.exitCode = 1;
  }
}

// Prisma v7 requires either an adapter (direct DB) or accelerateUrl; pass adapter here.
const client = new PrismaClient({ adapter: { provider: 'postgres', url: process.env.DATABASE_URL } });

try {
  console.log('Attempting to connect to the database...');
  await client.$connect();
  console.log('Prisma client connected successfully.');
} catch (err) {
  console.error('Prisma client connection failed:');
  console.error(err);
  process.exitCode = 1;
} finally {
  try {
    await client.$disconnect();
  } catch {}
}
