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

    const listSpecificationUseCase = container.resolve(ListSpecificationsUseCase)

    const specifications = await listSpecificationUseCase.execute();
    
    return response.json(specifications);
  }
}

export { ListSpecificationController };
