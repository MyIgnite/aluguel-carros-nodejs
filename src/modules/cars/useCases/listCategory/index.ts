import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

const categoryRepository = new CategoriesRepository();

const listCategoryUseCase = new ListCategoryUseCase(categoryRepository);

const listCategoriesController = new ListCategoriesController(listCategoryUseCase);

export { listCategoriesController };
