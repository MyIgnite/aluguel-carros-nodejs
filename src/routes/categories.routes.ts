import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./temp"
})

/** NOTE TSyringe
 * 
 * Ao utilizar a injeção de dependência com TSyringe, mudamos a forma como 
 * lidamos com as rotas, permitindo passar o controlador como um middleware. 
 * Isso permite que as dependências sejam resolvidas automaticamente e fornece 
 * uma maneira mais flexível e escalável de lidar com a lógica de negócios.
 */

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/", createCategoryController.handle);
categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.post("/import", upload.single("file"), importCategoryController.handle)

export { categoriesRoutes };
