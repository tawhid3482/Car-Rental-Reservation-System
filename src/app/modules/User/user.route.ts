import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();
router.post(
  "/signup",
  // auth(USER_ROLE.admin),
  // validateRequest(createStudentValidationSchema),
  UserController.createUser
);
router.post(
  "/signin",
  // auth(USER_ROLE.admin),
  // validateRequest(createStudentValidationSchema),
  UserController.createUser
);

router.get("/signup", UserController.createUser);

export const UserRoutes = router;
