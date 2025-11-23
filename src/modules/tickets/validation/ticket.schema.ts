import { z } from "zod";

// --- ENUMS / comuns ---
export const TicketStatusEnum = z.enum([
  "open",
  "in_progress",
  "pending",
  "resolved",
  "closed",
]);

export const TicketPriorityEnum = z.enum(["low", "normal", "high", "critical"]);

// --- CREATE TICKET ---
export const createTicketSchema = z.object({
  title: z.string().min(3, "O título precisa ter ao menos 3 caracteres"),
  description: z.string().min(5, "Descrição muito curta"),
  priority: TicketPriorityEnum.default("normal"),
});

// --- UPDATE STATUS ---
export const updateTicketStatusSchema = z.object({
  status: TicketStatusEnum,
});

// --- ASSIGN ANALYST ---
export const assignTicketSchema = z.object({
  agentId: z.string().uuid("agentId inválido"),
});

// --- QUERY FILTERS (para listar) ---
export const listTicketsQuerySchema = z
  .object({
    status: TicketStatusEnum.optional(),
    priority: TicketPriorityEnum.optional(),
    requesterId: z.string().uuid().optional(),
    agentId: z.string().uuid().optional(),
  })
  .optional();
