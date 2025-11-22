import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Categories
export async function getAllCategories() {
  const db = await getDb();
  if (!db) return [];
  const { categories } = await import("../drizzle/schema");
  return db.select().from(categories);
}

// Products
export async function getAllProducts() {
  const db = await getDb();
  if (!db) return [];
  const { products } = await import("../drizzle/schema");
  return db.select().from(products).where(eq(products.active, 1));
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const { products } = await import("../drizzle/schema");
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result[0];
}

export async function getFeaturedProducts() {
  const db = await getDb();
  if (!db) return [];
  const { products } = await import("../drizzle/schema");
  return db.select().from(products).where(and(eq(products.featured, 1), eq(products.active, 1)));
}

export async function createProduct(product: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { products } = await import("../drizzle/schema");
  const result = await db.insert(products).values(product);
  return result;
}

export async function updateProduct(id: number, product: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { products } = await import("../drizzle/schema");
  await db.update(products).set(product).where(eq(products.id, id));
  return getProductById(id);
}

export async function deleteProduct(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { products } = await import("../drizzle/schema");
  await db.delete(products).where(eq(products.id, id));
  return { success: true };
}

// Software
export async function getAllSoftware() {
  const db = await getDb();
  if (!db) return [];
  const { software } = await import("../drizzle/schema");
  return db.select().from(software).where(eq(software.active, 1));
}

export async function getSoftwareById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const { software } = await import("../drizzle/schema");
  const result = await db.select().from(software).where(eq(software.id, id)).limit(1);
  return result[0];
}

export async function createSoftware(item: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { software } = await import("../drizzle/schema");
  const result = await db.insert(software).values(item);
  return result;
}

export async function updateSoftware(id: number, item: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { software } = await import("../drizzle/schema");
  await db.update(software).set(item).where(eq(software.id, id));
  return getSoftwareById(id);
}

export async function deleteSoftware(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { software } = await import("../drizzle/schema");
  await db.delete(software).where(eq(software.id, id));
  return { success: true };
}

export async function createCategory(category: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { categories } = await import("../drizzle/schema");
  const result = await db.insert(categories).values(category);
  return result;
}

export async function updateCategory(id: number, category: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { categories } = await import("../drizzle/schema");
  await db.update(categories).set(category).where(eq(categories.id, id));
  const result = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
  return result[0];
}

export async function deleteCategory(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { categories } = await import("../drizzle/schema");
  await db.delete(categories).where(eq(categories.id, id));
  return { success: true };
}

// Upload
export async function uploadImage(input: { filename: string; data: string; mimeType: string }) {
  const { storagePut } = await import("./storage");
  
  // Convert base64 to buffer
  const base64Data = input.data.split(',')[1];
  const buffer = Buffer.from(base64Data, 'base64');
  
  // Generate unique filename
  const ext = input.filename.split('.').pop();
  const randomSuffix = Math.random().toString(36).substring(7);
  const filename = `uploads/${Date.now()}-${randomSuffix}.${ext}`;
  
  // Upload to S3
  const result = await storagePut(filename, buffer, input.mimeType);
  
  return { url: result.url };
}
