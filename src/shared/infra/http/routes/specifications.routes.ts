import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

/** NOTE TSyringe
 * 
 * Ao utilizar a injeção de dependência com TSyringe, mudamos a forma como 
 * lidamos com as rotas, permitindo passar o controlador como um middleware. 
 * Isso permite que as dependências sejam resolvidas automaticamente e fornece 
 * uma maneira mais flexível e escalável de lidar com a lógica de negócios.
 */

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

specificationsRoutes.get("/", listSpecificationController.handle);

export { specificationsRoutes };
