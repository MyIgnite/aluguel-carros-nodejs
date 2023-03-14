
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListUserUseCase {

  constructor (
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<User[]> {
    const user = await this.usersRepository.findById(id);
    const users = await this.usersRepository.list();

    if(!users.length) {
      throw new Error("No existing users!");
    }

    if(user.is_admin) {
      return users.map(user => {
        delete user.password;
        return user;
      });
    }

    return users.map(user => {
      delete user.is_admin;
      delete user.password;
      return user;
    })

  }

}

export { ListUserUseCase };
