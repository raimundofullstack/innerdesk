import { UserService } from "../../src/modules/users/user.service";
//import { UserRepository } from "../../src/modules/users/user.repository";

describe("UserService - Unit", () => {
  const repo = {
    findByEmail: jest.fn(),
    createUser: jest.fn(),
  } as any;

  const service = new UserService(repo);

  it("não deve permitir criar usuário com email duplicado", async () => {
    repo.findByEmail.mockResolvedValue({ id: 1 });

    await expect(
      service.register({
        name: "Test",
        email: "dup@example.com",
        password: "123456",
      })
    ).rejects.toThrow("E-mail já está em uso.");
  });
});
