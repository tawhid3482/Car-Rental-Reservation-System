import express from "express";

const router = express.Router();

router.post("/", CarController.createCarController);

export const CarRoutes = router;
