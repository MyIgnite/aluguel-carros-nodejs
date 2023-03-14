import { IResponseAuthenticateUserUseCaseDTO, IUsersRepositoryDTO } from "@modules/accounts/dtos/UsersRepositoryDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUsecase";
import { ListUserUseCase } from "./ListUserUseCase";

describe("Criar usuário", () => {
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let listUserUseCase: ListUserUseCase;
  let createUserUserCase: CreateUserUseCase;
  let authenticateUserUseCase: AuthenticateUserUseCase;

  const user1: IUsersRepositoryDTO = {
    name: "User 1",
    email: "user1@email.com",
    password: "123",
    driver_license: "001x"
  }
  
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    listUserUseCase = new ListUserUseCase(usersRepositoryInMemory);
    createUserUserCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
  })

  it("Deve ser possível listar todos os usuários", async () => {
    await createUserUserCase.execute(user1);

    await createUserUserCase.execute({
      name: "User 2",
      email: "user2@email.com",
      password: "123",
      driver_license: "1111x"
    });

    await createUserUserCase.execute({
      name: "User 3",
      email: "user3@email.com",
      password: "123",
      driver_license: "1111x"
    });
   
    const resultUser: IResponseAuthenticateUserUseCaseDTO = 
      await authenticateUserUseCase.execute({
        email: user1.email,
        password: user1.password
    });

    expect(resultUser).toHaveProperty("token");

    const searchedUser = await usersRepositoryInMemory.findByEmail(resultUser.user.email);
    const users = await listUserUseCase.execute(searchedUser.id);
    
    users.forEach(user => {
      const keys = Object.keys(user);
      expect(keys).toHaveLength(4);

      expect(user.id).toEqual(expect.any(String));
      expect(user.name).toEqual(expect.any(String));
      expect(user.email).toEqual(expect.any(String));
      expect(user.driver_license).toEqual(expect.any(String));
      
      expect(user.password).toBeUndefined;
      expect(user.is_admin).toBeUndefined;
    });
  })

  it("Deve ser possível listar todos os usuários sendo um perfil admin", async () => {
    // Criando usuários
    await createUserUserCase.execute(user1);

    await createUserUserCase.execute({
      name: "User 2",
      email: "user2@email.com",
      password: "123",
      driver_license: "1111x"
    });

    await createUserUserCase.execute({
      name: "User 3",
      email: "user3@email.com",
      password: "123",
      driver_license: "1111x"
    });
   
    // Autenticando user1
    const resultUser: IResponseAuthenticateUserUseCaseDTO = 
      await authenticateUserUseCase.execute({
        email: user1.email,
        password: user1.password
    });

    expect(resultUser).toHaveProperty("token");

    const searchedUser = 
      await usersRepositoryInMemory.findByEmail(resultUser.user.email);
      
    searchedUser.is_admin = true;

    const users = await listUserUseCase.execute(searchedUser.id);

    users.forEach(user => {
      const keys = Object.keys(user);
      expect(keys).toHaveLength(5);

      expect(user.id).toEqual(expect.any(String));
      expect(user.name).toEqual(expect.any(String));
      expect(user.email).toEqual(expect.any(String));
      expect(user.driver_license).toEqual(expect.any(String));
      expect(user.is_admin).toEqual(expect.any(Boolean));
      
      expect(user.password).toBeUndefined;
    })
  })
})