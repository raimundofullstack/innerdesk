import { Request, Response, NextFunction } from "express";

export function roles(...allowed: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = (req.user as any).role;

    if (!allowed.includes(role)) {
      return res.status(403).json({ message: "Acesso negado." });
    }

    next();
  };
}
