import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

/** NOTE TSyringe
 * 
 * container.resolve(CreateSpecificationUseCase) é usado para resolver 
 * (ou instanciar) a classe CreateSpecificationUseCase através do container. 
 * Ele procura por uma classe registrada com o nome CreateSpecificationUseCase no 
 * container e cria uma instância dessa classe. 
 */

class CreateSpecificationController {

  async handle(request: Request, response: Response): Promise<Response>{
    const { name, description } = request.body;

    const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);

    createSpecificationUseCase.execute({ name, description });

    return response.status(201).send("Created");
  }
}

export { CreateSpecificationController };
