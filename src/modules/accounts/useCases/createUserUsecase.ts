import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IUsersRepositoryDTO } from "../dtos/UsersRepositoryDTO";
import { IUsersRepository } from "../repositories/IUsersRepository";

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
  }: IUsersRepositoryDTO): Promise<void> {

    const passwordHash = await hash(password, 10);
    
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if(userAlreadyExists) {
      throw new Error("User Already exists!");
    }

    this.usersRepository.create({
      name,
      email,  
      password: passwordHash,
      driver_license
    });
  }

}

export { CreateUserUseCase };
