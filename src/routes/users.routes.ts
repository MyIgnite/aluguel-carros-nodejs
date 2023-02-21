import { Router } from "express";
import multer from "multer";
import { uploadConfig } from "../config/uploadConfig";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { ListUserController } from "../modules/accounts/useCases/listUser/ListUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig("./tmp/avatar"));

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", listUserController.handle);
usersRoutes.patch("/avatar",uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export { usersRoutes };
