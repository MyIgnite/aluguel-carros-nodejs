import { AppError } from "@shared/errors/AppError";
import HttpStatusCode from "@shared/errors/HttpStatusCode";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoriesUseCase } from "./ListCategoiesUseCase";

/** NOTE TSyringe
 * 
 * container.resolve() é usado para resolver (ou instanciar) a classe passada 
 * como parâmetro através do container.
 */

class ListCategoriesController {

  async handle(request: Request, response: Response): Promise<Response> {

    try {
      const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
  
      const categories = await listCategoriesUseCase.execute();
  
      return response.status(HttpStatusCode.OK).json(categories);

    } catch (error) {
      
      if(error.message === "No existing category!") {
        throw new AppError(error.message, HttpStatusCode.NO_CONTENT);
      }

      throw new Error(error.message);
    }
  }
}

export { ListCategoriesController };
