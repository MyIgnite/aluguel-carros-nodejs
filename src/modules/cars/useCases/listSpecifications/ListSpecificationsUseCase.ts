import { Specification } from "../../model/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

class ListSpecificationsUseCase {
  constructor (private listCategoryRepository: ISpecificationRepository) {}

  execute(): Specification[] {
    const specifications = this.listCategoryRepository.list();
    return specifications;
  }
}

export { ListSpecificationsUseCase };
