import express from "express";
import { carController } from "./car.controller";

const router = express.Router();

router.post("/", carController.createCarController);

router.get("/", carController.createCarController);

export const CarRoutes = router;
