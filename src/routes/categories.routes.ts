import { Router } from "express";
import multer from "multer";
import { uploadConfig } from "../config/uploadConfig";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { DownloadCsvCategoryController } from "../modules/cars/useCases/downloadCsvCategory/DownloadCsvCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

const uploaCSV = multer(uploadConfig("./tmp"));


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
const downloadCsvCategoryController = new DownloadCsvCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);
categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.post("/import", uploaCSV.single("file"), importCategoryController.handle)
categoriesRoutes.get("/download", downloadCsvCategoryController.handle);

export { categoriesRoutes };
