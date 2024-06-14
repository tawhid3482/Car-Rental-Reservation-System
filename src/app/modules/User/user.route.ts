import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();
router.post(
  "/signup",
  // auth(USER_ROLE.admin),
  // validateRequest(createStudentValidationSchema),
  UserController.createUserController
);
router.post(
  "/signin",
  // auth(USER_ROLE.admin),
  // validateRequest(createStudentValidationSchema),
  UserController.createUserController
);

// router.get("/signup", UserController.getUser);

export const UserRoutes = router;
