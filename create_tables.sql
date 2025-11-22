-- Create tables for Infinity SAT database

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  "nameEn" VARCHAR(255) NOT NULL,
  "nameAr" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

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
