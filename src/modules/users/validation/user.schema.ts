import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(3, "O nome precisa ter ao menos 3 caracteres"),
  email: z.email("Email inválido"),
  password: z.string().min(6, "A senha precisa ter ao menos 6 caracteres"),
});

export const loginUserSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(6, "A senha precisa ter ao menos 6 caracteres"),
});
