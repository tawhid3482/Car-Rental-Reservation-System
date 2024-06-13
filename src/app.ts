/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import express, { Application } from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser';
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));


app.use("/api", router);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
