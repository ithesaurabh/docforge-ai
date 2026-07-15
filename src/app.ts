import express from "express";
import { documentRoutes } from "./modules/documents/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/documents", documentRoutes);

export { app };