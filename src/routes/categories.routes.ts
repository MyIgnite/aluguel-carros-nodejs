import { Router } from "express";
import { PostgresCategoriesRepository } from "../modules/cars/repositories/PostgresRepositoriesCategory";

import { CreateCategoryService } from "../modules/cars/services/CreateCategoryServices";

const categoriesRoutes = Router();
const categoriesRepository = new PostgresCategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;
  
  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({ name, description});

  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  const categories = categoriesRepository.list();
  return response.json(categories);
});

export { categoriesRoutes };
