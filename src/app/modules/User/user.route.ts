import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validationRequest";
import { validateUser } from "./user.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(validateUser.createUserValidationSchema),
  UserControllers.createUser
);
router.get("/users/stats/:id", auth("user"), UserControllers.getUserStats);
router.get("/users", auth("admin", "super-admin"), UserControllers.getAllUser);
router.get("/users/:email", auth("user"), UserControllers.getUserByEmail);

router.patch(
  "/users/:email",
  auth("user", "admin", "super-admin"),
  validateRequest(validateUser.updateUserValidationSchema),
  UserControllers.updateUserByEmail
);

export const UserRoutes = router;
