import { AppError } from "@shared/errors/AppError";
import HttpStatusCode from "@shared/errors/HttpStatusCode";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

/** NOTE TSyringe
 * 
 * container.resolve() é usado para resolver (ou instanciar) a classe passada 
 * como parâmetro através do container.
 */

class ListSpecificationController {

  async handle(request: Request, response: Response): Promise<Response> {

    try {
      const listSpecificationUseCase = container.resolve(ListSpecificationsUseCase)
  
      const specifications = await listSpecificationUseCase.execute();
      
      return response.status(200).json(specifications);
      
    } catch (error) {
      
      if(error.message === "No existing specification!") {
        throw new AppError(error.message, HttpStatusCode.NO_CONTENT);
      }

      throw new Error(error.message);   
    }
  }
}

export { ListSpecificationController };
