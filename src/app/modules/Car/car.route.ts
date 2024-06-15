import express from "express";
import { carController } from "./car.controller";
import validateRequest from "../../middlewares/validationRequest";
import { carValidation } from "./car.validation";

const router = express.Router();

router.post("/",
    //  validateRequest(carValidation.carValidationSchema), 
     carController.createCarController);

router.get("/", carController.getAllCars);
router.get("/:id", carController.getSingleCars);

router.put("/:id", carController.updateSingleCar);
router.delete("/:id", carController.deleteSingleCar);

export const CarRoutes = router;
