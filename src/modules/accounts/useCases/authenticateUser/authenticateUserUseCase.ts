import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  },
  token: string;
}

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
  
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user =  await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new Error("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new Error("Email or password incorrect!");
    }

    const token = sign({}, "f580455f6507681630a262d058067290", {
      subject: user.id,
      expiresIn: "1d"
    });

    const tokenReturn: IResponse = {
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
