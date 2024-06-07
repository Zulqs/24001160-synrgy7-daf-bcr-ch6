import express, { Express, Request, Response } from 'express';
import dotenv from "dotenv";
import knex from "knex";
import { Model } from "objection";
import userRouter from "../app/routes/users.route";
import carsRouter from "../app/routes/cars.route";
import authRouter from "../app/routes/auth.route";
import logRouter from "../app/routes/log.route";
import setupSwagger from './swagger';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const knexInstance = knex({
    client: "pg",
    connection: {
        database: process.env.DBNAME,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        port: 5432
    }
})

Model.knex(knexInstance);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/sers", userRouter);
app.use("/api/cars", carsRouter);
app.use("/api/logs", logRouter);

app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({
        message: "BCR Rest API"
    })
})

setupSwagger(app);

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})


export default app;