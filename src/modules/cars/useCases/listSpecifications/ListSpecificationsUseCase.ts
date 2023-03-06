import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";


/** NOTE TSyringe
 * @injectable() é um decorador que é aplicado a uma classe para 
 * indicar que ela pode ser "injetada". 
 * 
 * A string é um token utilizado para identicar dentro do
 * container a classe que deve ser instanciada. 
 * "src/shared/container/index.ts"
 */

@injectable()
class ListSpecificationsUseCase {

  constructor (
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationsRepository.list();

    if(!specifications.length) {
      throw new Error("No existing specification!");
    }

    return specifications;
  }
}

export { ListSpecificationsUseCase };
