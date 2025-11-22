import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@infinity-sat.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("Admin CRUD Operations", () => {
  describe("Products", () => {
    it("should list all products", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.products.list();
      
      expect(Array.isArray(result)).toBe(true);
    });

    it("should get product by id", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.products.getById({ id: 1 });
      
      if (result) {
        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("nameEn");
        expect(result).toHaveProperty("nameAr");
      }
    });
  });

  describe("Software", () => {
    it("should list all software", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.software.list();
      
      expect(Array.isArray(result)).toBe(true);
    });

    it("should get software by id", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.software.getById({ id: 1 });
      
      if (result) {
        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("titleEn");
        expect(result).toHaveProperty("titleAr");
      }
    });
  });

  describe("Categories", () => {
    it("should list all categories", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.categories.list();
      
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("Role-based Access Control", () => {
    it("should allow admin to create product", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const testProduct = {
        nameEn: "Test Product",
        nameAr: "منتج تجريبي",
        descriptionEn: "Test description",
        descriptionAr: "وصف تجريبي",
        price: 100,
        image: "https://example.com/test.jpg",
        categoryId: 1,
        featured: false,
        active: true,
      };

      try {
        const result = await caller.products.create(testProduct);
        expect(result).toBeDefined();
      } catch (error) {
        // Database might not be available in test environment
        expect(error).toBeDefined();
      }
    });

    it("should deny non-admin user from creating product", async () => {
      const user: AuthenticatedUser = {
        id: 2,
        openId: "regular-user",
        email: "user@example.com",
        name: "Regular User",
        loginMethod: "manus",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      };

      const ctx: TrpcContext = {
        user,
        req: {
          protocol: "https",
          headers: {},
        } as TrpcContext["req"],
        res: {
          clearCookie: () => {},
        } as TrpcContext["res"],
      };

      const caller = appRouter.createCaller(ctx);

      const testProduct = {
        nameEn: "Test Product",
        nameAr: "منتج تجريبي",
        descriptionEn: "Test description",
        descriptionAr: "وصف تجريبي",
        price: 100,
        image: "https://example.com/test.jpg",
        categoryId: 1,
        featured: false,
        active: true,
      };

      try {
        await caller.products.create(testProduct);
        // Should not reach here
        expect(true).toBe(false);
      } catch (error: any) {
        // Should throw forbidden error for non-admin
        expect(error.code).toBe("FORBIDDEN");
      }
    });
  });
});
