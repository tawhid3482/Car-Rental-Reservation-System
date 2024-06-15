import express from "express";


const router = express.Router();

router.post("/",
     carController.createCarController);

// router.get("/", carController.getAllCars);
// router.get("/:id", carController.getSingleCars);

// router.put("/:id", carController.updateSingleCar);
// router.delete("/:id", carController.deleteSingleCar);

export const CarRoutes = router;
