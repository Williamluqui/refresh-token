import express from "express";
import { router } from "./router/routes";
import { handleError } from "./errors/errorAplication";

const app = express();
app.use(express.json());

// Routes
app.use("/api", router);

app.listen(3000, () => "Server running on port 3000");
// Middleware throw Error
app.use(handleError);
