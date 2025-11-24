// src/modules/tickets/ticket.repository.ts
import { Repository } from "typeorm";
import { dataSource } from "../../config/data-source";
import { Ticket } from "./ticket.entity";
import { User } from "../users/user.entity";

export class TicketRepository {
  private repo: Repository<Ticket>;
  private userRepo: Repository<User>;

  constructor() {
    this.repo = dataSource.getRepository(Ticket);
    this.userRepo = dataSource.getRepository(User);
  }

  async createTicket(data: Partial<Ticket>) {
    const ticket = this.repo.create(data);
    return this.repo.save(ticket);
  }

  async findById(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: ["created_by", "assigned_to"],
    });
  }

  async listAll() {
    return this.repo.find({
      relations: ["created_by", "assigned_to"],
    });
  }

  async listByRequester(userId: string) {
    return this.repo.find({
      where: { created_by: { id: userId } },
      relations: ["created_by", "assigned_to"],
    });
  }

  async update(ticket: Ticket) {
    return this.repo.save(ticket);
  }

  async findAgentById(agentId: string) {
    return this.userRepo.findOne({
      where: { id: agentId, role: "agent" },
    });
  }

  async findCreatorById(id: string) {
    return this.userRepo.findOne({ where: { id } });
  }
}
