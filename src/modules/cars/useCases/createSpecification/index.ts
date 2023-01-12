import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const categoryRepository = CategoriesRepository.getInstance();

const createSpecificationUseCase = new CreateSpecificationUseCase(categoryRepository);

const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase);

export { createSpecificationController };
