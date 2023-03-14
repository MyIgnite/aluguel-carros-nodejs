import { IUsersRepositoryDTO } from "@modules/accounts/dtos/UsersRepositoryDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateUserUseCase {

  constructor (
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,  
    password,
    driver_license
  }: IUsersRepositoryDTO): Promise<User> {

    const passwordHash = await hash(password, 10);
    
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if(userAlreadyExists) {
      throw new Error("User Already exists!");
    }

    const user = this.usersRepository.create({
      name,
      email,  
      password: passwordHash,
      driver_license
    });

    return user;
  }

}

export { CreateUserUseCase };
