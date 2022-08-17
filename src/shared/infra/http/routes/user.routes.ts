import { Router } from "express";
import multer from "multer";
import { container } from "tsyringe";

import uploadConfig from "../../../../config/upload";
import { UpdateUserAvatarService } from "../../../../modules/accounts/services/user/UpdateUserAvatarService";
import { UserProfileService } from "../../../../modules/accounts/services/user/UserProfileService";

const uploadAvatar = multer(uploadConfig);

const userRoutes = Router();

userRoutes.get("/", async (req, res) => {
  const { id } = req.user;

  const userProfileService = container.resolve(UserProfileService);

  const user = await userProfileService.execute({ id });

  return res.json(user);
});

userRoutes.patch("/avatar", uploadAvatar.single("image"), async (req, res) => {
  const { id } = req.user;
  const avatarFile = req.file.filename;

  const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

  await updateUserAvatarService.execute({ userId: id, avatarFile });

  return res.status(204).send();
});

export { userRoutes };
