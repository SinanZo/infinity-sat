import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Categories
  categories: router({
    list: publicProcedure.query(async () => {
      const { getAllCategories } = await import("./db");
      return getAllCategories();
    }),
  }),

  // Products
  products: router({
    list: publicProcedure.query(async () => {
      const { getAllProducts } = await import("./db");
      return getAllProducts();
    }),
    featured: publicProcedure.query(async () => {
      const { getFeaturedProducts } = await import("./db");
      return getFeaturedProducts();
    }),
    getById: publicProcedure
      .input((val: unknown) => {
        if (typeof val === "object" && val !== null && "id" in val) {
          return val as { id: number };
        }
        throw new Error("Invalid input");
      })
      .query(async ({ input }) => {
        const { getProductById } = await import("./db");
        return getProductById(input.id);
      }),
    create: protectedProcedure
      .input((val: unknown) => val as any)
      .mutation(async ({ input }) => {
        const { createProduct } = await import("./db");
        return createProduct(input);
      }),
    update: protectedProcedure
      .input((val: unknown) => val as any)
      .mutation(async ({ input }) => {
        const { updateProduct } = await import("./db");
        return updateProduct(input.id, input);
      }),
    delete: protectedProcedure
      .input((val: unknown) => {
        if (typeof val === "object" && val !== null && "id" in val) {
          return val as { id: number };
        }
        throw new Error("Invalid input");
      })
      .mutation(async ({ input }) => {
        const { deleteProduct } = await import("./db");
        return deleteProduct(input.id);
      }),
  }),

  // Software
  software: router({
    list: publicProcedure.query(async () => {
      const { getAllSoftware } = await import("./db");
      return getAllSoftware();
    }),
    getById: publicProcedure
      .input((val: unknown) => {
        if (typeof val === "object" && val !== null && "id" in val) {
          return val as { id: number };
        }
        throw new Error("Invalid input");
      })
      .query(async ({ input }) => {
        const { getSoftwareById } = await import("./db");
        return getSoftwareById(input.id);
      }),
    create: protectedProcedure
      .input((val: unknown) => val as any)
      .mutation(async ({ input }) => {
        const { createSoftware } = await import("./db");
        return createSoftware(input);
      }),
    update: protectedProcedure
      .input((val: unknown) => val as any)
      .mutation(async ({ input }) => {
        const { updateSoftware } = await import("./db");
        return updateSoftware(input.id, input);
      }),
    delete: protectedProcedure
      .input((val: unknown) => {
        if (typeof val === "object" && val !== null && "id" in val) {
          return val as { id: number };
        }
        throw new Error("Invalid input");
      })
      .mutation(async ({ input }) => {
        const { deleteSoftware } = await import("./db");
        return deleteSoftware(input.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;
