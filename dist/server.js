"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./router/routes");
const errorAplication_1 = require("./errors/errorAplication");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", routes_1.router);
app.listen(3000, () => "Server running on port 3000");
app.use(errorAplication_1.handleError);
//# sourceMappingURL=server.js.map