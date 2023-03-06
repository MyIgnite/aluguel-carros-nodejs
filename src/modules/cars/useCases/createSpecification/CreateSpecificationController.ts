import { AppError } from "@shared/errors/AppError";
import HttpStatusCode from "@shared/errors/HttpStatusCode";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

/** NOTE TSyringe
 * 
 * container.resolve() é usado para resolver (ou instanciar) a classe passada 
 * como parâmetro através do container.
 */

class CreateSpecificationController {

  async handle(request: Request, response: Response): Promise<Response>{

    try {
      const { name, description } = request.body;
  
      const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);
  
      await createSpecificationUseCase.execute({ name, description });
  
      return response.status(201).send("Created");
    
    } catch (error) {

      if(error.message === "Specification Alrseady exists!") {
        throw new AppError(error.message, HttpStatusCode.CONFLICT);
      }

      throw new Error(error.message);
    }
  }
}

export { CreateSpecificationController };
