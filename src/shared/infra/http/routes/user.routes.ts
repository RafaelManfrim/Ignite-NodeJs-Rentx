import { Router } from "express";
import multer from "multer";
import { container } from "tsyringe";

import uploadConfig from "../../../../config/upload";
import { UpdateUserAvatarService } from "../../../../modules/accounts/services/user/UpdateUserAvatarService";

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const userRoutes = Router();

userRoutes.patch("/avatar", uploadAvatar.single("image"), async (req, res) => {
  const { id } = req.user;
  const avatarFile = req.file.filename;

  const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

  await updateUserAvatarService.execute({ userId: id, avatarFile });

  return res.status(204).send();
});

export { userRoutes };
