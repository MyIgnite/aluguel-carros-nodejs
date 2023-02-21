import { IUsersRepositoryDTO } from "../dtos/UsersRepositoryDTO";
import { User } from "../entities/User";

interface IUsersRepository {
  create(data: IUsersRepositoryDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  list(id?: string): Promise<User[]>
}

export { IUsersRepository };
