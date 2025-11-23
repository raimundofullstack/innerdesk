import request from "supertest";
import { app } from "../../src/app";
import { dataSource } from "../../src/config/data-source";

describe("User Controller - Integration", () => {
  describe("POST /api/users/register", () => {
    it("deve criar um usuário com sucesso", async () => {
      const res = await request(app).post("/api/users/register").send({
        name: "Rai Test",
        email: "rai@example.com",
        password: "123456",
      });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body.email).toBe("rai@example.com");
      expect(res.body.name).toBe("Rai Test");
      expect(res.body.role).toBe("requester");
    });

    it("não deve criar usuário com email duplicado", async () => {
      // Primeiro usuário
      await request(app).post("/api/users/register").send({
        name: "User 1",
        email: "duplicate@example.com",
        password: "123456",
      });

      // Tentativa de criar com mesmo email
      const res = await request(app).post("/api/users/register").send({
        name: "User 2",
        email: "duplicate@example.com",
        password: "654321",
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("E-mail já está em uso.");
    });

    it("deve validar campos obrigatórios", async () => {
      const res = await request(app).post("/api/users/register").send({
        name: "Test User",
        // email faltando
        password: "123456",
      });

      expect(res.status).toBe(400);
    });
  });

  describe("POST /api/users/login", () => {
    beforeEach(async () => {
      // Cria um usuário para testar login
      await request(app).post("/api/users/register").send({
        name: "Login Test",
        email: "login@example.com",
        password: "123456",
      });
    });

    it("deve fazer login com credenciais válidas", async () => {
      const res = await request(app).post("/api/users/login").send({
        email: "login@example.com",
        password: "123456",
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toHaveProperty("id");
      expect(res.body.user.email).toBe("login@example.com");
    });

    it("não deve fazer login com senha incorreta", async () => {
      const res = await request(app).post("/api/users/login").send({
        email: "login@example.com",
        password: "senhaErrada",
      });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Credenciais inválidas.");
    });

    it("não deve fazer login com email inexistente", async () => {
      const res = await request(app).post("/api/users/login").send({
        email: "naoexiste@example.com",
        password: "123456",
      });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Credenciais inválidas.");
    });
  });
});
