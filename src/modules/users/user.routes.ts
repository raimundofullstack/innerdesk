import { Router } from "express";
import { UserController } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { roles } from "../../middlewares/roles";
import { validate } from "../../middlewares/validate";
import { loginUserSchema, registerUserSchema } from "./validation/user.schema";

const controller = new UserController();
export const userRoutes = Router();

userRoutes.post("/register", validate(registerUserSchema), controller.register);
userRoutes.post("/login", validate(loginUserSchema), controller.login);

// rota protegida
userRoutes.get("/", auth, roles("admin"), controller.list);
