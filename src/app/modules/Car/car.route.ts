import express from "express";
import { carController } from "./car.controller";

const router = express.Router();

router.post("/", carController.createCarController);

router.get("/", carController.getAllCars);
router.get("/:id", carController.getSingleCars);

export const CarRoutes = router;
