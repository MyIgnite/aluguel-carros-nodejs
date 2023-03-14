import { IUsersRepositoryDTO } from "../dtos/UsersRepositoryDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
  create(data: IUsersRepositoryDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  list(id?: string): Promise<User[]>
}

export { IUsersRepository };
