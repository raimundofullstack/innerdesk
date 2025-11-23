import { Request, Response, NextFunction } from "express";
import { TicketService } from "./ticket.service";
import { ticketResponse } from "./ticket.mapper";

const service = new TicketService();

export class TicketController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, priority } = req.body;
      const userId = (req.user as any).sub;

      const ticket = await service.create({
        title,
        description,
        priority,
        createdById: userId,
      });
      return res.status(201).json(ticketResponse(ticket));
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as any;
      const tickets = await service.list(user.role, user.sub);
      return res.json(tickets.map(ticketResponse));
    } catch (err) {
      next(err);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const ticketId = req.params.id;
      const { status } = req.body;
      const userRole = (req.user as any).role;

      const ticket = await service.updateStatus(ticketId, status, userRole);
      return res.json(ticketResponse(ticket));
    } catch (err) {
      next(err);
    }
  }

  async assign(req: Request, res: Response, next: NextFunction) {
    try {
      const ticketId = req.params.id;
      const { agentId } = req.body;
      const userRole = (req.user as any).role;

      const ticket = await service.assign(ticketId, agentId, userRole);
      return res.json(ticketResponse(ticket));
    } catch (err) {
      next(err);
    }
  }
}
