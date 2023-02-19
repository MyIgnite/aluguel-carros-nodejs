import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import HttpStatusCode from "../../../../errors/HttpStatusCode";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";

/** NOTE TSyringe
 * 
 * container.resolve() é usado para resolver (ou instanciar) a classe passada 
 * como parâmetro através do container.
 */

class AuthenticateUserController {

  async handle(request: Request, response: Response) {
    
    try {
      const { email, password } = request.body;
  
      const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
  
      const token = 
        await authenticateUserUseCase.execute({ email, password});
  
      return response.status(HttpStatusCode.CREATED).json(token)
      
    } catch (error) {
        if(error.message === "Email or password incorrect!") {
          throw new AppError(error.message, HttpStatusCode.UNAUTHORIZED);
        }

        throw new Error(error.message);
    }

  }
}

  export { AuthenticateUserController };

