import { AppError } from "@shared/errors/AppError";
import HttpStatusCode from "@shared/errors/HttpStatusCode";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

/** NOTE TSyringe
 * 
 * container.resolve() é usado para resolver (ou instanciar) a classe passada 
 * como parâmetro através do container.
 */

class ImportCategoryController {

  async handle(request: Request, response: Response): Promise<Response> {

    try {
      const { file } = request;
  
      const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
      
      const importResult = await importCategoryUseCase.execute(file);
  
      return response.status(HttpStatusCode.OK).json(importResult);
      
    } catch (error) {
        if(error.message === "Empty or badly fomatted file!") {

          // REVIEW  Criar URI dentro da .env
          
          throw new AppError({
            message: error.message,
            model: "http://localhost:4444/categories/download"
          }, HttpStatusCode.BAD_REQUEST);
        }

        throw new AppError(error.message, HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
  }
}

export { ImportCategoryController };
