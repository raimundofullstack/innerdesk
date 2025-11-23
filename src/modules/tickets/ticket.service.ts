import { dataSource } from "../../config/data-source";
import { Ticket, TicketStatus } from "./ticket.entity";
import { User } from "../users/user.entity";
import { AppError } from "../../errors/AppError";

export class TicketService {
  private ticketRepo = dataSource.getRepository(Ticket);
  private userRepo = dataSource.getRepository(User);

  async create(data: {
    title: string;
    description: string;
    priority: string;
    createdById: string;
  }) {
    const creator = await this.userRepo.findOne({
      where: { id: data.createdById },
    });

    if (!creator) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    const validPriorities = ["low", "normal", "high", "critical"];
    if (!validPriorities.includes(data.priority)) {
      throw new AppError(
        "Prioridade inválida. Use: low, normal, high ou critical.",
        400
      );
    }

    const ticket = this.ticketRepo.create({
      title: data.title,
      description: data.description,
      priority: data.priority as "low" | "normal" | "high" | "critical",
      created_by: creator,
      status: "open",
      assigned_to: null,
    });

    await this.ticketRepo.save(ticket);

    return ticket;
  }

  async list({ userRole, userId }: { userRole: string; userId: string }) {
    if (userRole === "requester") {
      return this.ticketRepo.find({
        where: { created_by: { id: userId } },
        relations: ["created_by", "assigned_to"],
      });
    }

    return this.ticketRepo.find({
      relations: ["created_by", "assigned_to"],
    });
  }

  async updateStatus({
    ticketId,
    status,
    userRole,
  }: {
    ticketId: string;
    status: TicketStatus;
    userRole: string;
  }) {
    const ticket = await this.ticketRepo.findOne({ where: { id: ticketId } });

    if (!ticket) {
      throw new AppError("Ticket não encontrado.", 404);
    }

    if (userRole === "requester") {
      throw new AppError("Requesters não podem mudar status.", 403);
    }

    ticket.status = status;

    await this.ticketRepo.save(ticket);
    return ticket;
  }

  async assign({
    ticketId,
    agentId,
    userRole,
  }: {
    ticketId: string;
    agentId: string;
    userRole: string;
  }) {
    if (userRole === "requester") {
      throw new AppError("Requesters não podem atribuir tickets.", 403);
    }

    const ticket = await this.ticketRepo.findOne({
      where: { id: ticketId },
      relations: ["created_by", "assigned_to"],
    });

    if (!ticket) {
      throw new AppError("Ticket não encontrado.", 404);
    }

    const agent = await this.userRepo.findOne({
      where: { id: agentId, role: "agent" },
    });

    if (!agent) {
      throw new AppError("O usuário informado não é um agent válido.", 400);
    }

    ticket.assigned_to = agent;
    await this.ticketRepo.save(ticket);

    return ticket;
  }
}
