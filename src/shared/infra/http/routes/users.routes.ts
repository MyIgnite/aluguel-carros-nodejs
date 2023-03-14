import { uploadConfig } from "@config/uploadConfig";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ListUserController } from "@modules/accounts/useCases/listUser/ListUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { Router } from "express";
import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig("./tmp/avatar"));

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.get(
  "/",
  ensureAuthenticated,
  listUserController.handle
);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRoutes };
