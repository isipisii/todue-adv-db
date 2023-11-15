import express, { Express, Request, Response, Application } from "express";
import createHttpError from "http-errors";
import { errorHandler } from "./middlewares/error.middleware";
import todoRoutes from "./routes/todo.route"
import dotenv from 'dotenv';

//For env File 
dotenv.config();

const app: Application = express()

app.use(express.json());
app.use("/todo", todoRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});
app.use((res, req, next) => {
    next(createHttpError(404, "Endpoint not found"));
});
app.use(errorHandler)

export default app