import { Router } from "express";
import { TicketController } from "./ticket.controller";
import { auth } from "../../middlewares/auth";
import { roles } from "../../middlewares/roles";
import {
  assignTicketSchema,
  createTicketSchema,
  updateTicketStatusSchema,
} from "./validation/ticket.schema";
import { validate } from "../../middlewares/validate";

const controller = new TicketController();
export const ticketRoutes = Router();

ticketRoutes.post(
  "/",
  auth,
  validate(createTicketSchema),
  roles("requester", "agent", "admin"),
  controller.create
);
ticketRoutes.get("/", auth, controller.list);
ticketRoutes.get("/:id", auth, controller.getTicketId);
ticketRoutes.patch(
  "/:id/status",
  auth,
  validate(updateTicketStatusSchema),
  roles("agent", "admin"),
  controller.updateStatus
);
ticketRoutes.patch(
  "/:id/assign",
  auth,
  validate(assignTicketSchema),
  roles("agent", "admin"),
  controller.assign
);
