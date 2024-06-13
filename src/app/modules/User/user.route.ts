import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
router.post(
    '/auth/signup',
    // auth(USER_ROLE.admin),
    // validateRequest(createStudentValidationSchema),
    UserController.createUser,
  );

  export const UserRoutes = router;
