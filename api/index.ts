import "dotenv/config";
import express, { Request, Response } from "express";
import path from "path";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "../server/_core/oauth";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";

const app = express();

// Configure body parser with larger size limit for file uploads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// OAuth callback under /api/oauth/callback
registerOAuthRoutes(app);

// tRPC API
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Serve static files from dist/public
const distPath = path.join(process.cwd(), "dist", "public");
app.use(express.static(distPath));

// Fall through to index.html for client-side routing
app.use("*", (_req: Request, res: Response) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Vercel serverless function handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Convert Vercel request to Express-compatible format and pass through app
  return new Promise((resolve, reject) => {
    app(req as any, res as any, (err?: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(undefined);
      }
    });
  });
}
