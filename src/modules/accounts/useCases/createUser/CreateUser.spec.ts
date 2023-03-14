import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUsecase";

describe("Criar usuário", () => {
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  })

  it("Espero que crie um novo usuário", async () => {
    await createUserUseCase.execute({
      name: "Maria",
      password: "123",
      email: "maria@email.com",
      driver_license: "XXX555666",
    })

    const user = await usersRepositoryInMemory.findByEmail("maria@email.com");
    
    expect(user).toHaveProperty("id");
    expect(user.is_admin).toBe(false);
  })

  it("Espero que não crie um usuário já existente", async () => {
    const user = {
      name: "José",
      password: "123",
      email: "jose@email.com",
      driver_license: "XXX555666",
    } 

    await createUserUseCase.execute(user);

    await expect(createUserUseCase.execute(user))
      .rejects.toBeInstanceOf(Error);

    await expect(createUserUseCase.execute(user))
      .rejects.toThrow("User Already exists!");

  })
})