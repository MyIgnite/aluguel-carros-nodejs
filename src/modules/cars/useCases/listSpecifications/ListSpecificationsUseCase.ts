import { Specification } from "../../entities/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

class ListSpecificationsUseCase {
  constructor (private specificationsRepository: ISpecificationRepository) {}

  execute(): Specification[] {
    const specifications = this.specificationsRepository.list();
    return specifications;
  }
}

export { ListSpecificationsUseCase };
