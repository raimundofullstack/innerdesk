// src/app.ts
import express from "express";
import cors from "cors";
import "reflect-metadata";
import { errorHandler } from "./middlewares/error-handler";
import router from "./routes/index";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

// middleware global de erros
app.use(errorHandler);

export { app };
