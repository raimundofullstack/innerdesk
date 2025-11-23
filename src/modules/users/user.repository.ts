import { Repository } from "typeorm";
import { dataSource } from "../../config/data-source";
import { User } from "./user.entity";

export class UserRepository {
  private repo: Repository<User>;

  constructor() {
    this.repo = dataSource.getRepository(User);
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async createUser(data: Partial<User>) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  async save(user: User): Promise<User> {
    return await dataSource.getRepository(User).save(user);
  }

  async find(options?: any) {
    return this.repo.find(options);
  }
}
