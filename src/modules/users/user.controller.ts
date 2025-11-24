import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";

const repository = new UserRepository();
const service = new UserService(repository);

export class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;

      const result = await service.register({ name, email, password });

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const result = await service.login({ email, password });

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
  async auth(req: Request, res: Response, next: NextFunction) {
    try {
      const header = req.headers.authorization;
      const user = await service.auth({ header });
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
}
