import express from "express";
import auth from "../../middlewares/auth";
import { AdminControllers } from "./admin.controller";

const router = express.Router();


router.get("/adminStats", auth('admin'), AdminControllers.getAdminStats);





export const AdminRoutes = router;
