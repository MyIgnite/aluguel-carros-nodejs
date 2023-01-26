// import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesUseCase } from "./ListCategoiesUseCase";
import { ListCategoriesController } from "./ListCategoriesController";

// const categoryRepository = CategoriesRepository.getInstance();
const categoryRepository = null;

const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository);

const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);

export { listCategoriesController };
