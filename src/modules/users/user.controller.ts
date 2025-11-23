import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";

const service = new UserService();

export class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;

      const result = await service.register(name, email, password);

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const result = await service.login(email, password);

      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await service.list();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }
}
