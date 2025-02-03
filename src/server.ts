import express from "express";
import { router } from "./router/routes";
import { handleError } from "./errors/errorAplication";
const { PORT } = process.env;

const app = express();
app.use(express.json());

// Routes
app.use("/api", router);

app.listen(PORT, () => `Server running on port ${PORT}`);

// Middleware throw Error
app.use(handleError);
