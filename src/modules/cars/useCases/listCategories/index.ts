import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoryUseCase } from "./ListCategoiesUseCase";
import { ListCategoriesController } from "./ListCategoriesController";

const categoryRepository = CategoriesRepository.getInstance();

const listCategoryUseCase = new ListCategoryUseCase(categoryRepository);

const listCategoriesController = new ListCategoriesController(listCategoryUseCase);

export { listCategoriesController };
