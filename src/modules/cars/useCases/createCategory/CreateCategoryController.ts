
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

/** NOTE TSyringe
 * 
 * container.resolve(CreateCategoryUseCase) é usado para resolver 
 * (ou instanciar) a classe CreateCategoryUseCase através do container. 
 * Ele procura por uma classe registrada com o nome CreateCategoryUseCase no 
 * container e cria uma instância dessa classe. 
 */

class CreateCategoryController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    await createCategoryUseCase.execute({ name, description});

    return response.status(201).send();
  }
}

export { CreateCategoryController };
