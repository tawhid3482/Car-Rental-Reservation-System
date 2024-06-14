import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/signup", UserController.createUserController);
router.post("/signin", UserController.signInUserController);

export const UserRoutes = router;
