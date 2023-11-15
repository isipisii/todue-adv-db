import express, { Express, Request, Response, Application } from "express";
import createHttpError from "http-errors";
import cors from "cors"
import { errorHandler } from "./middlewares/error.middleware";
import todoRoutes from "./routes/todo.route"
import dotenv from 'dotenv';

//For env File 
dotenv.config();

const app: Application = express()

app.use(express.json());
app.use(cors())
app.use("/todo", todoRoutes);

app.use((res, req, next) => {
    next(createHttpError(404, "Endpoint not found"));
});
app.use(errorHandler)

export default app