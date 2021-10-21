import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';
import { CreateUserController } from '../../../../modules/accounts/useCases/CreateUser/CreateUserController';
import { ProfileUserController } from '../../../../modules/accounts/useCases/ProfileUser/ProfileUserController';
import { UpdateUserAvatarController } from '../../../../modules/accounts/useCases/UpdateUserAvatar/UpdateUserAvatarController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserControler = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserContoller = new ProfileUserController();

usersRoutes.post('/', createUserControler.handle);
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
);
usersRoutes.get('/profile', ensureAuthenticated, profileUserContoller.handle);
export { usersRoutes };
