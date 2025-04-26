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
router.get("/users/stats/:id", UserControllers.getUserStats);
router.get("/users", UserControllers.getAllUser);
router.get("/users/:email", UserControllers.getUserByEmail);

router.patch("/users/:email",validateRequest(validateUser.updateUserValidationSchema), UserControllers.updateUserByEmail);





export const UserRoutes = router;
