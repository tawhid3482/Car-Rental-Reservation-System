import express from 'express';
import validateRequest from '../../middlewares/validationRequest';
import { validationUser } from '../User/user.validation';
import { UserController } from '../User/user.controller';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';


const router = express.Router();

router.post(
  '/signup',
  validateRequest(validationUser.userValidationSchema),
  UserController.createUserController,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login,
);

export const AuthRoutes = router;