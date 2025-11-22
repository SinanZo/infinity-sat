import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock storage module
vi.mock("./storage", () => ({
  storagePut: vi.fn(async (key: string, buffer: Buffer, contentType: string) => {
    return {
      url: `https://s3.example.com/${key}`,
      key: key,
    };
  }),
}));

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
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

function createRegularUserContext(): TrpcContext {
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

describe("upload.image", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("allows admin to upload image with base64 data", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // Create a simple base64 encoded image (1x1 red pixel PNG)
    const base64Data = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==";

    const result = await caller.upload.image({
      base64: base64Data,
      filename: "test-image.png",
      contentType: "image/png",
    });

    expect(result).toHaveProperty("url");
    expect(result).toHaveProperty("key");
    expect(result.url).toContain("s3.example.com");
    expect(result.key).toContain("products/");
    expect(result.key).toContain(".png");
  });

  it("allows admin to upload image without contentType (defaults to image/jpeg)", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const base64Data = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==";

    const result = await caller.upload.image({
      base64: base64Data,
      filename: "test-image.jpg",
    });

    expect(result).toHaveProperty("url");
    expect(result).toHaveProperty("key");
  });

  it("strips data URL prefix from base64 if present", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // Base64 with data URL prefix
    const base64WithPrefix = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==";

    const result = await caller.upload.image({
      base64: base64WithPrefix,
      filename: "test-image.png",
      contentType: "image/png",
    });

    expect(result).toHaveProperty("url");
    expect(result).toHaveProperty("key");
  });

  it("generates unique filenames for each upload", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const base64Data = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==";

    const result1 = await caller.upload.image({
      base64: base64Data,
      filename: "test.png",
    });

    const result2 = await caller.upload.image({
      base64: base64Data,
      filename: "test.png",
    });

    // Keys should be different due to timestamp and random suffix
    expect(result1.key).not.toBe(result2.key);
  });

  it("rejects upload from non-admin user", async () => {
    const ctx = createRegularUserContext();
    const caller = appRouter.createCaller(ctx);

    const base64Data = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==";

    await expect(
      caller.upload.image({
        base64: base64Data,
        filename: "test-image.png",
      })
    ).rejects.toThrow();
  });

  it("rejects upload with invalid input (missing base64)", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.upload.image({
        base64: "",
        filename: "test-image.png",
      })
    ).rejects.toThrow();
  });

  it("rejects upload with invalid input (missing filename)", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const base64Data = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==";

    await expect(
      caller.upload.image({
        base64: base64Data,
        filename: "",
      })
    ).rejects.toThrow();
  });
});
