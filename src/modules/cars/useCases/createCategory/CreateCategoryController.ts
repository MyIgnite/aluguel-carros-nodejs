
import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import HttpStatusCode from "../../../../errors/HttpStatusCode";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

/** NOTE TSyringe
 * 
 * container.resolve() é usado para resolver (ou instanciar) a classe passada 
 * como parâmetro através do container.
 */

class CreateCategoryController {

  async handle(request: Request, response: Response): Promise<Response> {

    try {
      const { name, description } = request.body;
  
      const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
  
      await createCategoryUseCase.execute({ name, description});
  
      return response.status(201).send("Created");
      
    } catch (error) {
      
      if(error.message === "Category Already exists!") {
        throw new AppError(error.message, HttpStatusCode.CONFLICT);
      }

      throw new Error(error.message);
    }
  }
}

export { CreateCategoryController };
