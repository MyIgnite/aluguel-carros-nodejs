import { getRepository, Repository } from "typeorm";
import { IUsersRepositoryDTO } from "../../dtos/UsersRepositoryDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

/** NOTE Typeorm
 * Uma classe implementa uma interface e fornecer uma camada de abstração para 
 * acessar os dados de uma entidade no banco de dados.
 * 
 * Repository fornece uma estrutura básica para armazenar, recuperar e 
 * gerenciar dados da entidade passada como parâmetro.
 * 
 */

class UsersRepository implements IUsersRepository {

  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  
  async create({
    name,
    email,
    password,
    driver_license
  }: IUsersRepositoryDTO): Promise<void> {

    const user = this.repository.create({
      name,
      email,
      password,
      driver_license
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };
