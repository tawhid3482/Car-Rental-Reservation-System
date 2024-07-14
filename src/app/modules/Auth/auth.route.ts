import express from 'express';
import validateRequest from '../../middlewares/validationRequest';

import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import { UserControllers } from '../User/user.controller';
import { validateUser } from '../User/user.validation';


const router = express.Router();

router.post(
  '/signup',
  validateRequest(validateUser.createUserValidationSchema),
  UserControllers.createUser,
);

router.post(
  '/signin',
  validateRequest(AuthValidation.SignInValidationSchema),
  AuthControllers.signInUser,
);

export const AuthRoutes = router;