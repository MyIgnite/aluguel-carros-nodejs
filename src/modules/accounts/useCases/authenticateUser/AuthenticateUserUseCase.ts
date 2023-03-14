import { IRequestAuthenticateUserUseCaseDTO, IResponseAuthenticateUserUseCaseDTO } from "@modules/accounts/dtos/UsersRepositoryDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

/** NOTE TSyringe
 * @injectable() é um decorador que é aplicado a uma classe para 
 * indicar que ela pode ser "injetada". 
 * 
 * A string é um token utilizado para identicar dentro do
 * container a classe que deve ser instanciada. 
 * "src/shared/container/index.ts"
 */

/** NOTE JWT
 * 1 - Verificar se o usuário existe
 * 2 - Verificar se a senha está correta
 * 3 - Gerar jsonwebtoken e retorna-lo
 */

@injectable()
class AuthenticateUserUseCase {
  
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  
  async execute({ 
    email, 
    password 
  }: IRequestAuthenticateUserUseCaseDTO): Promise<IResponseAuthenticateUserUseCaseDTO> {

    const user =  await this.usersRepository.findByEmail(email);
    const msgError = "Email or password incorrect!"

    if(!user) {
      throw new Error(msgError);
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new Error(msgError);
    }

    // NOTE Criar .env
    const token = sign({}, "f580455f6507681630a262d058067290", {
      subject: user.id,
      expiresIn: "1d"
    });

    const tokenReturn: IResponseAuthenticateUserUseCaseDTO = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase };
