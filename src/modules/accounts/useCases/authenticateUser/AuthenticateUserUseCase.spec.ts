
import { IUsersRepositoryDTO } from "@modules/accounts/dtos/UsersRepositoryDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUsecase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUserCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Autenticar usuário", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUserCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
  });

  it("Deve ser possível autenticar um usuário", async () => {
    const user: IUsersRepositoryDTO = {
      name: "Renan Moreira",
      email: "renan@email.com",
      password: "123",
      driver_license: "001x"
    }

    await createUserUserCase.execute(user);
    
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty("token");
  });

  it("Não Deve ser possível autenticar um usuário inexistente", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "marcos@email.com",
        password: "123"
      });
    }).rejects.toBeInstanceOf(Error);

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "marcos@email.com",
        password: "123"
      });
    }).rejects.toThrow("Email or password incorrect!");
  });

  it("Não Deve ser possível autenticar um usuário com senha inválida", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "renan@email.com",
        password: "senha incorreta"
      });
    }).rejects.toBeInstanceOf(Error);

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "marcos@email.com",
        password: "senha incorreta"
      });
    }).rejects.toThrow("Email or password incorrect!");
  });
})