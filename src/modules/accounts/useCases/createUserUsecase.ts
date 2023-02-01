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
    
    // Criar o método
    
    // const userAlreadyExists = await this.usersRepository.findByName(username);

    // if(userAlreadyExists) {
    //   throw new Error("User Already exists!");
    // }

    this.usersRepository.create({
      name,
      email,  
      password,
      driver_license
    });
  }

}

export { CreateUserUseCase };
