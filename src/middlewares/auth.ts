import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Token não enviado." });
  }

  const [, token] = header.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    req.user = decoded; // opcional: tipar no Request

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
}
