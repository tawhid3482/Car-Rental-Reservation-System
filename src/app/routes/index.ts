import { Router } from "express";
import { UserRoutes } from "../modules/User/user.route";
import { CarRoutes } from "../modules/Car/car.route";

const router = Router();

const moduleRoutes = [
    {
      path: '/auth',
      route: UserRoutes,
    },
    {
      path: '/cars',
      route: CarRoutes,
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
