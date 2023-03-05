import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  description: string;
}

/** NOTE TSyringe
 * @injectable() é um decorador que é aplicado a uma classe para 
 * indicar que ela pode ser "injetada". 
 * 
 * A string é um token utilizado para identicar dentro do
 * container a classe que deve ser instanciada. 
 * "src/shared/container/index.ts"
 */

@injectable()
class CreateSpecificationUseCase {

  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationsRepository
    ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists = await this.specificationRepository.findByName(name);

    if(specificationAlreadyExists) {
      throw new Error("Specification Alrseady exists!");
    }

    this.specificationRepository.create({
      name,
      description
    });
  }
}

export { CreateSpecificationUseCase };
