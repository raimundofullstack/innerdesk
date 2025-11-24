import { TicketStatus } from "./ticket.entity";
import { AppError } from "../../errors/AppError";
import { TicketRepository } from "./ticket.repository";

export class TicketService {
  private repo = new TicketRepository();

  async create(data: {
    title: string;
    description: string;
    priority: string;
    createdById: string;
  }) {
    const creator = await this.repo.findCreatorById(data.createdById);

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

    return await this.repo.createTicket({
      title: data.title,
      description: data.description,
      priority: data.priority as "low" | "normal" | "high" | "critical",
      created_by: creator,
      status: "open",
      assigned_to: null,
    });
  }

  async list({ userRole, userId }: { userRole: string; userId: string }) {
    if (userRole === "requester") {
      return this.repo.listByRequester(userId);
    }

    return await this.repo.listAll();
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
    const ticket = await this.repo.findById(ticketId);

    if (!ticket) {
      throw new AppError("Ticket não encontrado.", 404);
    }

    if (userRole === "requester") {
      throw new AppError("Requesters não podem mudar status.", 403);
    }

    ticket.status = status;

    return await this.repo.update(ticket);
  }

  async getTicketId({ ticketId }: { ticketId: string }) {
    const ticket = await this.repo.findById(ticketId);
    if (!ticket) {
      throw new AppError("Ticket não encontrado.", 404);
    }
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

    const ticket = await this.repo.findById(ticketId);

    if (!ticket) {
      throw new AppError("Ticket não encontrado.", 404);
    }

    const agent = await this.repo.findAgentById(agentId);

    if (!agent) {
      throw new AppError("O usuário informado não é um agent válido.", 400);
    }

    ticket.assigned_to = agent;
    return await this.repo.update(ticket);
  }
}
