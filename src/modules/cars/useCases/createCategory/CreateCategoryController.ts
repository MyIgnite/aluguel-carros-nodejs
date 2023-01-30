
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

/** NOTE TSyringe
 * 
 * container.resolve() é usado para resolver (ou instanciar) a classe passada 
 * como parâmetro através do container.
 */

class CreateCategoryController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    await createCategoryUseCase.execute({ name, description});

    return response.status(201).send("Created");
  }
}

export { CreateCategoryController };
