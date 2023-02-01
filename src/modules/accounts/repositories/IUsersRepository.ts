import { IUsersRepositoryDTO } from "../dtos/UsersRepositoryDTO";

interface IUsersRepository {
  create(data: IUsersRepositoryDTO): Promise<void>;
}

export { IUsersRepository };
