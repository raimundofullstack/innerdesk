import { User } from "../users/user.entity";
import { Ticket } from "./ticket.entity";

export function userResponse(user: User | null) {
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export function ticketResponse(ticket: Ticket) {
  return {
    id: ticket.id,
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
    priority: ticket.priority,
    created_at: ticket.created_at,
    updated_at: ticket.updated_at,
    created_by: userResponse(ticket.created_by),
    assigned_to: userResponse(ticket.assigned_to),
  };
}
