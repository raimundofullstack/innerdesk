import { Router } from "express";
import { userRoutes } from "../modules/users/user.routes";
import { ticketRoutes } from "../modules/tickets/ticket.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/tickets", ticketRoutes);

export default router;
