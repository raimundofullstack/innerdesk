import { dataSource } from "../../config/data-source";
import { AppError } from "../../errors/AppError";
import { User } from "./user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
  private userRepo = dataSource.getRepository(User);

  async register(name: string, email: string, password: string) {
    const exists = await this.userRepo.findOne({ where: { email } });

    if (exists) {
      throw new AppError("E-mail já está em uso.", 400);
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({
      name,
      email,
      password: hashed,
      role: "requester",
    });

    await this.userRepo.save(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new AppError("Credenciais inválidas.", 401);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new AppError("Credenciais inválidas.", 401);
    }

    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return { token };
  }

  async list() {
    return this.userRepo.find({
      select: ["id", "name", "email", "role", "created_at"],
    });
  }
}
