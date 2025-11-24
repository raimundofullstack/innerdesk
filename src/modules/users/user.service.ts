import { dataSource } from "../../config/data-source";
import { AppError } from "../../errors/AppError";
import { User } from "./user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "./user.repository";

export class UserService {
  constructor(private userRepo: UserRepository) {}

  async register({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    const exists = await this.userRepo.findByEmail(email);

    if (exists) {
      throw new AppError("E-mail já está em uso.", 400);
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await this.userRepo.createUser({
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

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.userRepo.findByEmail(email);

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

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async list() {
    return this.userRepo.find({
      select: ["id", "name", "email", "role", "created_at"],
    });
  }

  async auth({ header }: { header: string | undefined }) {
    if (!header || !header.startsWith("Bearer "))
      throw new AppError("Token missing or invalid", 401);

    const token = header.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    const user = await this.userRepo.findOne({
      where: { id: payload.userId },
      select: ["id", "name", "email", "role", "created_at", "updated_at"],
    });

    if (!user) throw new AppError("User not found", 401);

    return user;
  }
}
