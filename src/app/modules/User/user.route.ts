import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validationRequest";
import { validateUser } from "./user.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(validateUser.createUserValidationSchema),
  UserControllers.createUser
);

export const UserRoutes = router;
