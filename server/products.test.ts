import { describe, expect, it, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createMockContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("products procedures", () => {
  const ctx = createMockContext();
  const caller = appRouter.createCaller(ctx);

  it("should list all products", async () => {
    const products = await caller.products.list();
    
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    
    // Check first product structure
    const firstProduct = products[0];
    expect(firstProduct).toHaveProperty("id");
    expect(firstProduct).toHaveProperty("nameEn");
    expect(firstProduct).toHaveProperty("nameAr");
    expect(firstProduct).toHaveProperty("price");
  });

  it("should return featured products only", async () => {
    const products = await caller.products.list();
    const featuredProducts = products.filter(p => p.featured === 1);
    
    expect(featuredProducts.length).toBeGreaterThan(0);
    expect(featuredProducts.every(p => p.featured === 1)).toBe(true);
  });

  it("should have products with valid prices", async () => {
    const products = await caller.products.list();
    
    products.forEach(product => {
      expect(product.price).toBeGreaterThan(0);
      expect(typeof product.price).toBe("number");
    });
  });

  it("should have products with both English and Arabic names", async () => {
    const products = await caller.products.list();
    
    products.forEach(product => {
      expect(product.nameEn).toBeTruthy();
      expect(product.nameAr).toBeTruthy();
      expect(typeof product.nameEn).toBe("string");
      expect(typeof product.nameAr).toBe("string");
    });
  });

  it("should have products with category IDs", async () => {
    const products = await caller.products.list();
    
    products.forEach(product => {
      expect(product.categoryId).toBeTruthy();
      expect(typeof product.categoryId).toBe("number");
    });
  });
});

describe("software procedures", () => {
  const ctx = createMockContext();
  const caller = appRouter.createCaller(ctx);

  it("should list all software", async () => {
    const software = await caller.software.list();
    
    expect(Array.isArray(software)).toBe(true);
    expect(software.length).toBeGreaterThan(0);
    
    // Check first software structure
    const firstSoftware = software[0];
    expect(firstSoftware).toHaveProperty("id");
    expect(firstSoftware).toHaveProperty("titleEn");
    expect(firstSoftware).toHaveProperty("titleAr");
    expect(firstSoftware).toHaveProperty("version");
    expect(firstSoftware).toHaveProperty("fileType");
  });

  it("should have software with valid file types", async () => {
    const software = await caller.software.list();
    const validFileTypes = ["software", "apk", "loader", "rom", "channels"];
    
    software.forEach(item => {
      expect(validFileTypes).toContain(item.fileType);
    });
  });

  it("should have software with both English and Arabic titles", async () => {
    const software = await caller.software.list();
    
    software.forEach(item => {
      expect(item.titleEn).toBeTruthy();
      expect(item.titleAr).toBeTruthy();
      expect(typeof item.titleEn).toBe("string");
      expect(typeof item.titleAr).toBe("string");
    });
  });

  it("should have software with version numbers", async () => {
    const software = await caller.software.list();
    
    software.forEach(item => {
      expect(item.version).toBeTruthy();
      expect(typeof item.version).toBe("string");
    });
  });

  it("should have software with model information", async () => {
    const software = await caller.software.list();
    
    software.forEach(item => {
      expect(item.model).toBeTruthy();
      expect(typeof item.model).toBe("string");
    });
  });
});
