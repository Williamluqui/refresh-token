import express from "express";
import AuthController from "../controller/authController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { ensureRefreshToken } from "../middleware/ensureRefreshToken";

export const router = express.Router();

router.post("/auth/register", AuthController.registerUser);
router.post("/auth/login", AuthController.authLogin);
router.post("/auth/refresh", ensureRefreshToken, AuthController.refreshTokenUser);
router.post("/auth/logout", ensureRefreshToken, AuthController.logoutUser);

router.get("/user", ensureAuthenticated, AuthController.routeTest);
