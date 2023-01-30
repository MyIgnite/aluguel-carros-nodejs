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

    const { file } = request;

    console.log('File controller', file)

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
    
    await importCategoryUseCase.execute(file);

    return response.status(201).send("Created");
  }
}

export { ImportCategoryController };
