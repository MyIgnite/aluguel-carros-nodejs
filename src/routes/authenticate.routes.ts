import { Router } from "express";
import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/authenticateUserController";

const authenticateRoutes = Router();

/** NOTE TSyringe
 * 
 * Ao utilizar a injeção de dependência com TSyringe, mudamos a forma como 
 * lidamos com as rotas, permitindo passar o controlador como um middleware. 
 * Isso permite que as dependências sejam resolvidas automaticamente e fornece 
 * uma maneira mais flexível e escalável de lidar com a lógica de negócios.
 */

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);

export { authenticateRoutes };
