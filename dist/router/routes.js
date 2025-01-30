"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controller/authController"));
const ensureAuthenticated_1 = require("../middleware/ensureAuthenticated");
const ensureRefreshToken_1 = require("../middleware/ensureRefreshToken");
exports.router = express_1.default.Router();
exports.router.post("/auth/register", authController_1.default.registerUser);
exports.router.post("/auth/login", authController_1.default.authLogin);
exports.router.post("/auth/refresh", ensureRefreshToken_1.ensureRefreshToken, authController_1.default.refreshTokenUser);
exports.router.post("/auth/logout", ensureRefreshToken_1.ensureRefreshToken, authController_1.default.logoutUser);
exports.router.get("/user", ensureAuthenticated_1.ensureAuthenticated, authController_1.default.routeTest);
//# sourceMappingURL=routes.js.map