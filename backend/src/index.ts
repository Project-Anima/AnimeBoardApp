import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import admin from "./firebaseAdmin.js";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

interface AuthRequest extends Request {
    user?: {
        uid: string;
        name?: string;
        email?: string;
    },
}

// Firebaseトークン検証ミドルウェア
const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer")) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const idToken = authHeader.split("Bearer ")[1];

    if (!idToken) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

// 投稿取得（誰でも可）
app.get("/posts", async (req: Request, res: Response) => {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "server error" });
    }
});

// 投稿作成（ログイン必須）
app.post("/posts", verifyToken, async (req: AuthRequest, res: Response) => {
  const user = req.user!;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const post = await prisma.post.create({
      data: {
        userId: user.uid,
        username: user.name || "匿名",
        content,
      },
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});