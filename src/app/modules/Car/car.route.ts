import express from "express";

const router = express.Router();

router.post("/", UserController.createUserController);

export const CarRoutes = router;
