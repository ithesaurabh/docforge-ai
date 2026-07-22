import express from "express";
import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/error.js";
import notFoundMiddleware from "./middlewares/not-found.js";

const app = express();      

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1",routes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
export { app };