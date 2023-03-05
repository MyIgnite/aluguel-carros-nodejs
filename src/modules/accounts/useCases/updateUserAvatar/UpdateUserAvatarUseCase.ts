import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

// REVIEW Limitar tipos de arquivos de imagens

@injectable()
class UpdateUserAvatarUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, avatar_file}: IRequest): Promise<void> {
    
    const user = await this.usersRepository.findById(user_id);
    
    if(user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    } else {
      throw new Error("User does not exists!")
    }

    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
