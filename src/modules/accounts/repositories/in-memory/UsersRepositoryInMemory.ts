import { IUsersRepositoryDTO } from "../../dtos/UsersRepositoryDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    name, 
    email, 
    password, 
    driver_license 
  }: IUsersRepositoryDTO): Promise<User> {
    
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      driver_license
    })

    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }

  async list(id?: string): Promise<User[]> {
    if(id) {
      const user = this.findById(id);
      const users = [];
      users.push(user);
      return users;
    }

    return this.users;
  }
}

export { UsersRepositoryInMemory };
