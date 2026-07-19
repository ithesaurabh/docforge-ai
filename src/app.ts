import express from "express";
import { documentRoutes } from "./modules/documents/index.js";
import errorMiddleware from "./middlewares/error.js";
import notFoundMiddleware from "./middlewares/not-found.js";
import {chatRoutes} from "./modules/chat/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/documents", documentRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/health", (req, res) => {
    res.status(200).json({ message: "API is healthy & running" });
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);
export { app };